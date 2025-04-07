#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
const int buttonPin = 2;
const int ledPin = 4;
int lastButtonState = HIGH;
int currentButtonState;
BLEServer* pServer = NULL;
BLECharacteristic* pTxCharacteristic = NULL;
bool deviceConnected = false;
#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // Standard NUS Service
#define CUSTOM_CHAR_TX_UUID    "66bb3d05-dbd8-45ca-8920-6f75b112ab9c" // Your Custom TX Characteristic
class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      Serial.println("BLE Client Connected");
    }
    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      Serial.println("BLE Client Disconnected - Will not re-advertise automatically.");
    }
};
void setup() {
  Serial.begin(115200);
  Serial.println("Prototype BLE Setup...");
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  BLEDevice::init("Wokwi_ESP32_Proto");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pTxCharacteristic = pService->createCharacteristic(
                      CUSTOM_CHAR_TX_UUID,
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
  pTxCharacteristic->addDescriptor(new BLE2902()); // Needed for notifications
  pService->start();
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  BLEDevice::startAdvertising();
  Serial.println("Advertising BLE Service...");
}
void loop() {
  currentButtonState = digitalRead(buttonPin);
  // Detect when button is first pressed (edge detection)
  if (lastButtonState == HIGH && currentButtonState == LOW) {
    Serial.println("Button Pressed!");
    // 1. Simulate Haptic Feedback (Pulse LED)
    digitalWrite(ledPin, HIGH);
    delay(150);
    digitalWrite(ledPin, LOW);
    // 2. Send BLE Signal (if connected)
    if (deviceConnected) {
      String message = "BTN:1"; // Data to send
      pTxCharacteristic->setValue(message);
      pTxCharacteristic->notify(); // Send notification
      Serial.print("Sent BLE Notification: ");
      Serial.println(message);
    } else {
      Serial.println("Button pressed, but no BLE client connected.");
    }
    delay(50); // Debounce delay after action
  }
  lastButtonState = currentButtonState; // Remember button state
  delay(10); // Small delay for stability
}