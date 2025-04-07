#include <ArduinoBLE.h>

BLEDevice peripheral;
BLECharacteristic txCharacteristic;

const char* targetDeviceName = "ArduinoBLE_Proto";  // Namnet från sändaren
const char* serviceUUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
const char* charUUID = "66BB3D05-DBD8-45CA-8920-6F75B112AB9C";

void setup() {
  Serial.begin(115200);
  while (!Serial);

  Serial.println("Starting BLE Receiver...");

  if (!BLE.begin()) {
    Serial.println("Starting BLE failed!");
    while (1);
  }

  BLE.scan();  // Start scanning efter sändare
}

void loop() {
  // Om vi inte är anslutna, fortsätt leta
  if (!peripheral) {
    peripheral = BLE.available();
    if (peripheral) {
      Serial.print("Found device: ");
      Serial.println(peripheral.localName());

      // Kontrollera att det är vår sändare
      if (peripheral.localName() == targetDeviceName) {
        BLE.stopScan();
        Serial.println("Connecting ...");

        if (peripheral.connect()) {
          Serial.println("Connected!");
          if (peripheral.discoverService(serviceUUID)) {
            txCharacteristic = peripheral.characteristic(charUUID);

            if (txCharacteristic) {
                txCharacteristic.subscribe();
                Serial.println("Subscribed to notifications.");
                
            } else {
              Serial.println("Characteristic not found.");
            }
          } else {
            Serial.println("Service not found.");
          }
        } else {
          Serial.println("Connection failed.");
          peripheral = BLEDevice(); // Reset
        }
      }
    }
  }

  // Om vi är anslutna och har en characteristic
  if (peripheral && peripheral.connected() && txCharacteristic) {
    if (txCharacteristic.valueUpdated()) {
        int len = txCharacteristic.valueLength();
        const uint8_t* data = txCharacteristic.value();
        
        String value = "";
        for (int i = 0; i < len; i++) {
          value += (char)data[i];
        }
        
      Serial.print("Received Notification: ");
      Serial.println(value);
    }
  }

  delay(10);
}
