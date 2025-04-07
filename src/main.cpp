#include <ArduinoBLE.h>

const int buttonPin = 2;
const int ledPin = 4;

int lastButtonState = HIGH;
int currentButtonState;

BLEService customService("6E400001-B5A3-F393-E0A9-E50E24DCCA9E"); // NUS-style service
BLECharacteristic txCharacteristic("66BB3D05-DBD8-45CA-8920-6F75B112AB9C", BLENotify, 20);

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
        txCharacteristic.setValue(message.c_str());

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
}
