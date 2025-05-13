#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <vector>

const int buttonPin = 2; // GPIO2 (Button pin)
const int ledPin = 3;   // GPIO3 (LED pin for feedback)

BLEServer *pServer = nullptr;
BLECharacteristic *pTxCharacteristic = nullptr;
bool deviceConnected = false;

#define SERVICE_UUID "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

enum ButtonEventType
{
  NONE,
  SHORT_PRESS,
  LONG_PRESS
};
// Struct to store button events with press type and timestamp
struct ButtonEvent
{
  ButtonEventType type;
  unsigned long timestamp;
};

std::vector<ButtonEvent> eventQueue;

volatile bool buttonInterruptTriggered = false;
volatile unsigned long buttonPressTime = 0;
volatile bool buttonHeld = false;
volatile ButtonEventType detectedEvent = NONE;

// BLE Server Callbacks
class MyServerCallbacks : public BLEServerCallbacks
{
  void onConnect(BLEServer *pServer) override
  {
    deviceConnected = true;
    Serial.println("BLE Client Connected!");

    unsigned long currentMillis = millis();

    // Send buffered events
    for (const ButtonEvent &e : eventQueue)
    {
      unsigned long ageSeconds = (currentMillis - e.timestamp) / 1000;
      String msg;

      switch (e.type)
      {
      case SHORT_PRESS:
        msg = "Short_Button_Press " + String(ageSeconds) + " seconds ago";
        break;
      case LONG_PRESS:
        msg = "Long_Button_Press " + String(ageSeconds) + " seconds ago";
        break;
      default:
        continue;
      }

      pTxCharacteristic->setValue(msg.c_str());
      pTxCharacteristic->notify();
      delay(50);
      Serial.println("Sent buffered message: " + msg);
    }

    eventQueue.clear();
  }

  void onDisconnect(BLEServer *pServer) override
  {
    deviceConnected = false;
    Serial.println("BLE Client Disconnected.");
    BLEDevice::startAdvertising();
  }
};

// Button Interrupt Service Routine (ISR)
void IRAM_ATTR handleButtonInterrupt()
{
  static unsigned long lastInterruptTime = 0;
  unsigned long currentTime = millis();

  if (currentTime - lastInterruptTime < 50)
    return; // Debounce
  lastInterruptTime = currentTime;

  if (digitalRead(buttonPin) == LOW)
  {
    buttonPressTime = currentTime;
    buttonHeld = true;
  }
  else
  {
    if (buttonHeld)
    {
      unsigned long duration = currentTime - buttonPressTime;
      if (duration > 2000)
      {
        detectedEvent = LONG_PRESS;
      }
      else
      {
        detectedEvent = SHORT_PRESS;
      }
      buttonHeld = false;
      buttonInterruptTriggered = true;
    }
  }
}

// Setup function
void setup()
{
  Serial.begin(115200);
  delay(1000);
  Serial.println("Starting BLE Button with Interrupt...");

  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT); // Set LED pin as output
  attachInterrupt(digitalPinToInterrupt(buttonPin), handleButtonInterrupt, CHANGE);

  // BLE Setup
  BLEDevice::init("ESP32C3_Button");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);
  pTxCharacteristic = pService->createCharacteristic(
      CHARACTERISTIC_UUID,
      BLECharacteristic::PROPERTY_NOTIFY);
  pTxCharacteristic->addDescriptor(new BLE2902());
  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->start();

  Serial.println("BLE Advertising started...");
}

// Loop function
void loop()
{
  if (buttonInterruptTriggered)
  {
    buttonInterruptTriggered = false;
    unsigned long now = millis();
    String message;

    // Create event and handle it
    ButtonEvent newEvent = {detectedEvent, now};

    if (detectedEvent == SHORT_PRESS)
    {
      // Short press: LED on for 1 second
      digitalWrite(ledPin, LOW);
      delay(1000); // LED stays on for 1 second
      digitalWrite(ledPin, HIGH);
      message = "Short_Button_Press at " + String(now) + " ms";
    }
    else if (detectedEvent == LONG_PRESS)
    {
      // Long press: LED on for 3 seconds
      digitalWrite(ledPin, LOW);
      delay(3000); // LED stays on for 3 seconds
      digitalWrite(ledPin, HIGH);
      message = "Long_Button_Press at " + String(now) + " ms";
    }

    Serial.println("Detected: " + message);

    if (deviceConnected)
    {
      // Send message if device is connected
      pTxCharacteristic->setValue(message.c_str());
      pTxCharacteristic->notify();
      Serial.println("BLE notification sent!");
    }
    else
    {
      // Store offline event if not connected
      eventQueue.push_back(newEvent);
      Serial.println("Stored offline event.");
    }

    detectedEvent = NONE; // Reset the event
  }

  delay(10); // Small delay to avoid CPU overload
}
