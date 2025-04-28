 /*#include <ArduinoBLE.h>
 // variables for button
 const int buttonPin = 4;
 int oldButtonState = LOW;
 void setup() {
   Serial.begin(9600);
   while (!Serial);
   // configure the button pin as input
   pinMode(buttonPin, INPUT);
   // initialize the Bluetooth® Low Energy hardware
   BLE.begin();
   Serial.println("Bluetooth® Low Energy Central - LED control");
   // start scanning for peripherals
   BLE.scanForUuid("19b10000-e8f2-537e-4f6c-d104768a1214");
 }
 void loop() {
   // check if a peripheral has been discovered
   BLEDevice peripheral = BLE.available();
   if (peripheral) {
     // discovered a peripheral, print out address, local name, and advertised service
     Serial.print("Found ");
     Serial.print(peripheral.address());
     Serial.print(" '");
     Serial.print(peripheral.localName());
     Serial.print("' ");
     Serial.print(peripheral.advertisedServiceUuid());
     Serial.println();
     if (peripheral.localName() != "LED") {
       return;
     }
     // stop scanning
     BLE.stopScan();
     controlLed(peripheral);
     // peripheral disconnected, start scanning again
     BLE.scanForUuid("19b10000-e8f2-537e-4f6c-d104768a1214");
   }
 }
 void controlLed(BLEDevice peripheral) {
   // connect to the peripheral
   Serial.println("Connecting ...");
   if (peripheral.connect()) {
     Serial.println("Connected");
   } else {
     Serial.println("Failed to connect!");
     return;
   }
   // discover peripheral attributes
   Serial.println("Discovering attributes ...");
   if (peripheral.discoverAttributes()) {
     Serial.println("Attributes discovered");
   } else {
     Serial.println("Attribute discovery failed!");
     peripheral.disconnect();
     return;
   }
   // retrieve the LED characteristic
   BLECharacteristic ledCharacteristic = peripheral.characteristic("19b10001-e8f2-537e-4f6c-d104768a1214");
   if (!ledCharacteristic) {
     Serial.println("Peripheral does not have LED characteristic!");
     peripheral.disconnect();
     return;
   } else if (!ledCharacteristic.canWrite()) {
     Serial.println("Peripheral does not have a writable LED characteristic!");
     peripheral.disconnect();
     return;
   }
   while (peripheral.connected()) {
     // while the peripheral is connected
     // read the button pin
     int buttonState = digitalRead(buttonPin);
     if (oldButtonState != buttonState) {
       // button changed
       oldButtonState = buttonState;
       if (buttonState) {
         Serial.println("button pressed");
         // button is pressed, write 0x01 to turn the LED on
         ledCharacteristic.writeValue((byte)0x01);
       } else {
         Serial.println("button released");
         // button is released, write 0x00 to turn the LED off
         ledCharacteristic.writeValue((byte)0x00);
       }
     }
   }
   Serial.println("Peripheral disconnected");
 }

 
#include <ArduinoBLE.h>

BLEService ledService("19B10000-E8F2-537E-4F6C-D104768A1214"); // Bluetooth® Low Energy LED Service

// Bluetooth® Low Energy LED Switch Characteristic - custom 128-bit UUID, read and writable by central
BLEByteCharacteristic switchCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);

const int ledPin = LED_BUILTIN; // pin to use for the LED

void setup() {
  Serial.begin(9600);
  while (!Serial);

  // set LED pin to output mode
  pinMode(ledPin, OUTPUT);

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting Bluetooth® Low Energy module failed!");

    while (1);
  }

  // set advertised local name and service UUID:
  BLE.setLocalName("LED");
  BLE.setAdvertisedService(ledService);

  // add the characteristic to the service
  ledService.addCharacteristic(switchCharacteristic);

  // add service
  BLE.addService(ledService);

  // set the initial value for the characeristic:
  switchCharacteristic.writeValue(0);

  // start advertising
  BLE.advertise();

  Serial.println("BLE LED Peripheral");
}

void loop() {
  // listen for Bluetooth® Low Energy peripherals to connect:
  BLEDevice central = BLE.central();

  // if a central is connected to peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());

    // while the central is still connected to peripheral:
    while (central.connected()) {
      // if the remote device wrote to the characteristic,
      // use the value to control the LED:
      if (switchCharacteristic.written()) {
        if (switchCharacteristic.value()) {   // any value other than 0
          Serial.println("LED on");
          digitalWrite(ledPin, HIGH);         // will turn the LED on
        } else {                              // a 0 value
          Serial.println(F("LED off"));
          digitalWrite(ledPin, LOW);          // will turn the LED off
        }
      }
    }

    // when the central disconnects, print it out:
    Serial.print(F("Disconnected from central: "));
    Serial.println(central.address());
  }
}


------------------------------------------------------------
Old code
 #include <ArduinoBLE.h>
 const int buttonPin = 2;
 const int ledPin = 4;
 int lastButtonState = HIGH;
 int currentButtonState;
 BLEService customService("6E400001-B5A3-F393-E0A9-E50E24DCCA9E"); // NUS-style service
 BLECharacteristic txCharacteristic("66BB3D05-DBD8-45CA-8920-6F75B112AB9C", BLEWrite | BLENotify, 20);
 void setup() {
   Serial.begin(115200);
   Serial.println("Starting up...");
   while (!Serial);
   pinMode(buttonPin, INPUT_PULLUP);
   pinMode(ledPin, OUTPUT);
   digitalWrite(ledPin, LOW);
   if (!BLE.begin()) {
     Serial.println("Starting BLE failed!");
     while (1);
   }
   BLE.setLocalName("ArduinoBLE_Proto");
   BLE.setAdvertisedService(customService);
   customService.addCharacteristic(txCharacteristic);
   BLE.addService(customService);
   txCharacteristic.setValue("Init"); // optional initial value
   BLE.advertise();
   Serial.println("BLE Service Advertising Started...");
 }
 void loop() {
   BLEDevice central = BLE.central();
   if (central) {
     Serial.print("Connected to central: ");
     Serial.println(central.address());
     while (central.connected()) {
       currentButtonState = digitalRead(buttonPin);
       if (lastButtonState == HIGH && currentButtonState == LOW) {
         Serial.println("Button Pressed!");
         digitalWrite(ledPin, HIGH);
         delay(150);
         digitalWrite(ledPin, LOW);
         String message = "BTN:1";
         txCharacteristic.setValue(message.c_str()); // Set the value of the characteristic
         //BLE.write(txCharacteristic); // Write and send the notification
         Serial.print("Sent BLE Notification: ");
         Serial.println(message);
         delay(50);
       }
       lastButtonState = currentButtonState;
       delay(10);
     }
     Serial.print("Disconnected from central: ");
     Serial.println(central.address());
   }
 }*/