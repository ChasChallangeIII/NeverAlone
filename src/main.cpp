#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <vector>

const int buttonPin = 2;  // GPIO2

BLEServer* pServer = nullptr;
BLECharacteristic* pTxCharacteristic = nullptr;
bool deviceConnected = false;

#define SERVICE_UUID        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

// Message queue for offline storage
std::vector<String> messageQueue;

// ISR state
volatile bool buttonInterruptTriggered = false;
volatile unsigned long buttonPressTime = 0;
volatile bool buttonHeld = false;

enum ButtonEventType { NONE, SHORT_PRESS, LONG_PRESS };
volatile ButtonEventType detectedEvent = NONE;

// BLE connection callbacks
class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      Serial.println("BLE Client Connected!");

      // Flush queued messages
      for (const String& msg : messageQueue) {
        pTxCharacteristic->setValue(msg.c_str());
        pTxCharacteristic->notify();
        delay(50);
        Serial.println("Sent buffered message: " + msg);
      }
      messageQueue.clear();
    }

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      Serial.println("BLE Client Disconnected.");
      BLEDevice::startAdvertising();
    }
};

// ISR to track button state
void IRAM_ATTR handleButtonInterrupt() {
  static unsigned long lastInterruptTime = 0;
  unsigned long currentTime = millis();

  // Debounce: skip if within 50ms of last interrupt
  if (currentTime - lastInterruptTime < 50) return;
  lastInterruptTime = currentTime;

  if (digitalRead(buttonPin) == LOW) {
    buttonPressTime = currentTime;
    buttonHeld = true;
  } else {
    if (buttonHeld) {
      unsigned long duration = currentTime - buttonPressTime;
      if (duration > 2000) {
        detectedEvent = LONG_PRESS;
      } else {
        detectedEvent = SHORT_PRESS;
      }
      buttonHeld = false;
      buttonInterruptTriggered = true;
    }
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("Starting BLE Button with Interrupt...");

  pinMode(buttonPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(buttonPin), handleButtonInterrupt, CHANGE);

  // BLE Setup
  BLEDevice::init("ESP32C3_Button");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService* pService = pServer->createService(SERVICE_UUID);

  pTxCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_NOTIFY
  );
  pTxCharacteristic->addDescriptor(new BLE2902());

  pService->start();

  BLEAdvertising* pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->start();

  Serial.println("BLE Advertising started...");
}

void loop() {
  if (buttonInterruptTriggered) {
    buttonInterruptTriggered = false;
    String message;

    if (detectedEvent == SHORT_PRESS) {
      message = "Short_Button_Press at " + String(millis()) + " ms";
    } else if (detectedEvent == LONG_PRESS) {
      message = "Long_Button_Press at " + String(millis()) + " ms";
    }

    Serial.println("Detected: " + message);

    if (deviceConnected) {
      pTxCharacteristic->setValue(message.c_str());
      pTxCharacteristic->notify();
      Serial.println("BLE notification sent!");
    } else {
      messageQueue.push_back(message);
      Serial.println("Stored message for later.");
    }

    detectedEvent = NONE;
  }

  delay(10); // Avoid busy loop
}
