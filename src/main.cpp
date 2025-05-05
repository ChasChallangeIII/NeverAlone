#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <vector>

/// GPIO pin for the tactile button
const int buttonPin = 2; // GPIO2 on ESP32

// BLE core variables
BLEServer *pServer = nullptr;
BLECharacteristic *pTxCharacteristic = nullptr;
bool deviceConnected = false;

#define SERVICE_UUID "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

/// Enum representing the type of button press
enum ButtonEventType
{
  NONE,
  SHORT_PRESS,
  LONG_PRESS
};

/// Struct to store button events with press type and timestamp
struct ButtonEvent
{
  ButtonEventType type;    ///< Type of button press (short/long)
  unsigned long timestamp; ///< Time in milliseconds since device started
};

/// Queue to buffer events while BLE is disconnected
std::vector<ButtonEvent> eventQueue;

/// Interrupt service routine flags and state
volatile bool buttonInterruptTriggered = false;
volatile unsigned long buttonPressTime = 0;
volatile bool buttonHeld = false;
volatile ButtonEventType detectedEvent = NONE;

/**
 * @brief BLE Server Callbacks
 * Handles BLE connection events and flushes queued messages.
 */
class MyServerCallbacks : public BLEServerCallbacks
{
  void onConnect(BLEServer *pServer) override
  {
    deviceConnected = true;
    Serial.println("BLE Client Connected!");

    unsigned long currentMillis = millis();

    // Send all buffered events with time offset
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
      delay(50); // Prevent BLE overflow
      Serial.println("Sent buffered message: " + msg);
    }

    eventQueue.clear(); // Clear the queue after flushing
  }

  void onDisconnect(BLEServer *pServer) override
  {
    deviceConnected = false;
    Serial.println("BLE Client Disconnected.");
    BLEDevice::startAdvertising(); // Re-enable advertising for new connections
  }
};

/**
 * @brief Interrupt Service Routine for handling button press/release
 * Debounces and determines if the press is short or long.
 */
void IRAM_ATTR handleButtonInterrupt()
{
  static unsigned long lastInterruptTime = 0;
  unsigned long currentTime = millis();

  // Debounce: ignore if too close to last interrupt
  if (currentTime - lastInterruptTime < 50)
    return;
  lastInterruptTime = currentTime;

  if (digitalRead(buttonPin) == LOW)
  {
    // Button pressed
    buttonPressTime = currentTime;
    buttonHeld = true;
  }
  else
  {
    // Button released
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
      buttonInterruptTriggered = true; // Notify main loop to process
    }
  }
}

void setup()
{
  Serial.begin(115200);
  delay(1000); // Wait for serial to initialize
  Serial.println("Starting BLE Button with Interrupt...");

  // Button setup
  pinMode(buttonPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(buttonPin), handleButtonInterrupt, CHANGE);

  // Initialize BLE
  BLEDevice::init("ESP32C3_Button");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a characteristic for sending notifications to client
  pTxCharacteristic = pService->createCharacteristic(
      CHARACTERISTIC_UUID,
      BLECharacteristic::PROPERTY_NOTIFY);
  pTxCharacteristic->addDescriptor(new BLE2902());

  pService->start();

  // Start advertising BLE service
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->start();

  Serial.println("BLE Advertising started...");
}

// Processes detected button events and sends them via BLE or queues them if offline.
void loop()
{
  if (buttonInterruptTriggered)
  {
    buttonInterruptTriggered = false;
    unsigned long now = millis();
    String message;

    // Create event and handle it
    ButtonEvent newEvent = {detectedEvent, now};

    if (deviceConnected)
    {
      // Format message for immediate send
      switch (detectedEvent)
      {
      case SHORT_PRESS:
        message = "Short_Button_Press at " + String(now) + " ms";
        break;
      case LONG_PRESS:
        message = "Long_Button_Press at " + String(now) + " ms";
        break;
      default:
        break;
      }

      pTxCharacteristic->setValue(message.c_str());
      pTxCharacteristic->notify();
      Serial.println("BLE notification sent: " + message);
    }
    else
    {
      // Save event to queue for later transmission
      eventQueue.push_back(newEvent);
      Serial.println("Stored offline event.");
    }

    detectedEvent = NONE; // Reset state
  }
  delay(10);
}
