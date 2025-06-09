#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <vector>

/* ---------------------- GPIO Configuration ---------------------- */
const int buttonPin = 2; // GPIO2: Input pin for physical push button
const int ledPin = 3;    // GPIO3: Output pin for feedback LED

/* ---------------------- BLE Service & Characteristic UUIDs ---------------------- */
// These UUIDs follow the Nordic UART Service (NUS) convention
#define SERVICE_UUID "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

/* ---------------------- BLE Server State ---------------------- */
BLEServer *pServer = nullptr;                        // BLE server instance
BLECharacteristic *pTxCharacteristic = nullptr;      // Characteristic for sending notifications
bool deviceConnected = false;                        // Connection state flag

/* ---------------------- Button Event Management ---------------------- */
/**
 * @brief Enum representing button press event types.
 */
enum ButtonEventType {
  NONE,
  SHORT_PRESS,
  LONG_PRESS
};

/**
 * @brief Struct representing a button event with type and timestamp.
 */
struct ButtonEvent {
  ButtonEventType type;
  unsigned long timestamp; // Milliseconds since boot (using millis())
};

// Queue to store button events while BLE is disconnected
std::vector<ButtonEvent> eventQueue;

/* ---------------------- ISR State ---------------------- */
volatile bool buttonInterruptTriggered = false;    // Flag to indicate interrupt occurred
volatile unsigned long buttonPressTime = 0;        // Time when button was pressed
volatile bool buttonHeld = false;                  // Flag indicating button is being held
volatile ButtonEventType detectedEvent = NONE;     // Event detected from button

/* ---------------------- BLE Server Callback Class ---------------------- */
/**
 * @brief Custom BLE server callbacks to handle connection and disconnection events.
 */
class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer *pServer) override {
    deviceConnected = true;
    Serial.println("BLE Client Connected!");

    unsigned long currentMillis = millis();

    // Send all queued button events to the client
    for (const ButtonEvent &e : eventQueue) {
      unsigned long ageSeconds = (currentMillis - e.timestamp) / 1000;
      String msg;

      switch (e.type) {
        case SHORT_PRESS:
          msg = "Short_Button_Press " + String(ageSeconds) + " seconds ago";
          break;
        case LONG_PRESS:
          msg = "Long_Button_Press " + String(ageSeconds) + " seconds ago";
          break;
        default:
          continue; // Skip NONE
      }

      pTxCharacteristic->setValue(msg.c_str());
      pTxCharacteristic->notify();
      delay(50); // Small delay to avoid BLE congestion
      Serial.println("Sent buffered message: " + msg);
    }

    eventQueue.clear(); // Clear queue after successful transmission
  }

  void onDisconnect(BLEServer *pServer) override {
    deviceConnected = false;
    Serial.println("BLE Client Disconnected.");
    BLEDevice::startAdvertising(); // Resume advertising for next connection
  }
};

/* ---------------------- Button Interrupt Service Routine ---------------------- */
/**
 * @brief Interrupt handler for button pin.
 *        Differentiates between short and long presses.
 */
void IRAM_ATTR handleButtonInterrupt() {
  static unsigned long lastInterruptTime = 0;
  unsigned long currentTime = millis();

  // Software debounce (ignore toggles within 50ms)
  if (currentTime - lastInterruptTime < 50)
    return;
  lastInterruptTime = currentTime;

  if (digitalRead(buttonPin) == LOW) {
    // Button pressed
    buttonPressTime = currentTime;
    buttonHeld = true;
  } else {
    // Button released
    if (buttonHeld) {
      unsigned long duration = currentTime - buttonPressTime;
      detectedEvent = (duration > 2000) ? LONG_PRESS : SHORT_PRESS;
      buttonHeld = false;
      buttonInterruptTriggered = true;
    }
  }
}

/* ---------------------- Arduino Setup ---------------------- */
/**
 * @brief Arduino initialization function.
 *        Configures GPIOs, BLE stack, and advertising.
 */
void setup() {
  Serial.begin(115200);
  delay(1000); // Give time for USB serial monitor to connect
  Serial.println("Starting BLE Button with Interrupt...");

  // Configure GPIO pins
  pinMode(buttonPin, INPUT_PULLUP); // Active-low button
  pinMode(ledPin, OUTPUT);          // LED output pin

  // Attach interrupt to handle button press/release
  attachInterrupt(digitalPinToInterrupt(buttonPin), handleButtonInterrupt, CHANGE);

  // Initialize BLE stack and server
  BLEDevice::init("ESP32C3_Button");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create BLE service and characteristic
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pTxCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_NOTIFY
  );
  pTxCharacteristic->addDescriptor(new BLE2902()); // Required for notifications on most clients

  pService->start();

  // Start BLE advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->start();

  Serial.println("BLE Advertising started...");
}

/* ---------------------- Arduino Loop ---------------------- */
/**
 * @brief Main application loop.
 *        Processes button events and sends BLE notifications if connected.
 */
void loop() {
  if (buttonInterruptTriggered) {
    buttonInterruptTriggered = false;
    unsigned long now = millis();
    String message;

    // Create new button event
    ButtonEvent newEvent = { detectedEvent, now };

    // LED feedback logic
    if (detectedEvent == SHORT_PRESS) {
      digitalWrite(ledPin, LOW);
      delay(1000); // Short press: LED on for 1 second
      digitalWrite(ledPin, HIGH);
      message = "Short_Button_Press at " + String(now) + " ms";
    } else if (detectedEvent == LONG_PRESS) {
      digitalWrite(ledPin, LOW);
      delay(3000); // Long press: LED on for 3 seconds
      digitalWrite(ledPin, HIGH);
      message = "Long_Button_Press at " + String(now) + " ms";
    }

    Serial.println("Detected: " + message);

    if (deviceConnected) {
      // Send BLE notification
      pTxCharacteristic->setValue(message.c_str());
      pTxCharacteristic->notify();
      Serial.println("BLE notification sent!");
    } else {
      // Queue event for later if BLE is disconnected
      eventQueue.push_back(newEvent);
      Serial.println("Stored offline event.");
    }
    detectedEvent = NONE; // Reset event state
  }

  delay(10); // Idle time to reduce CPU usage
}
