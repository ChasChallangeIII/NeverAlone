#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// Set up your pins here
const int buttonPin = 2;  // Button connected to GPIO2

// BLE variables
BLEServer* pServer = nullptr;
BLECharacteristic* pTxCharacteristic = nullptr;
bool deviceConnected = false;

// UUIDs for service and characteristic (you can customize these)
#define SERVICE_UUID        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

// Class to handle connection/disconnection
class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      Serial.println("BLE Client Connected!");
    }
    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      Serial.println("BLE Client Disconnected.");
      BLEDevice::startAdvertising(); // Restart advertising
    }
};

void setup() {
  Serial.begin(115200);
  delay(1000); // Ensure USB Serial initialization
  Serial.println("Starting BLE Button Prototype...");

  pinMode(buttonPin, INPUT_PULLUP);  // Button with active low

  // Initialize BLE
  BLEDevice::init("ESP32C3_Button"); // The name you will see on your mobile
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);

  pTxCharacteristic = pService->createCharacteristic(
                        CHARACTERISTIC_UUID,
                        BLECharacteristic::PROPERTY_NOTIFY
                      );

  pTxCharacteristic->addDescriptor(new BLE2902());

  pService->start();
  
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->start();
  
  Serial.println("BLE Advertising started...");
}

void loop() {
  static int lastButtonState = HIGH;
  int currentButtonState = digitalRead(buttonPin);

  if (lastButtonState == HIGH && currentButtonState == LOW) {
    Serial.println("Button Pressed!");

    // Get timestamp
    unsigned long timestamp = millis(); // Time since the program started

    // Create the message with the timestamp
    String message = "Button_Pressed at " + String(timestamp) + " ms";

    // Send BLE notification to mobile device if connected
    if (deviceConnected) {
      pTxCharacteristic->setValue(message.c_str());
      pTxCharacteristic->notify();
      Serial.println("BLE notification sent to mobile!");
    } else {
      Serial.println("No BLE client connected.");
    }
    delay(50); // Debounce
  }

  lastButtonState = currentButtonState;
  delay(10);
}
