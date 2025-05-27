# NeverAlone IoT Button

The **NeverAlone IoT Button** is a compact and discreet ESP32-based device that enhances personal safety in public spaces. With a single press, it sends a BLE signal to a paired mobile device, triggering a simulated call. It features haptic feedback, offline logging, and low-power design, and integrates seamlessly with the NeverAlone mobile app.

This repository contains the firmware for the button, written in C++ and built using [PlatformIO](https://platformio.org/).

---

## 🔧 Features

- **One-Tap Activation** – Sends a BLE event to trigger safety features on the mobile app.
- **Offline Logging** – If no connection is available, logs the event locally for later transmission.
- **Haptic Feedback** – Confirms successful activation via a vibration motor.
- **Low Power Design** – Utilizes ESP32’s deep sleep mode for extended battery life.
- **BLE Communication** – Efficient communication over Bluetooth Low Energy.

---

## 🧰 Hardware Requirements

| Component             | Description                                  |
|----------------------|----------------------------------------------|
| ESP32 Dev Board       | e.g., ESP32-WROOM-32                         |
| Tactile Push Button   | Connected to a GPIO for input                |
| Vibration Motor       | 3V coin or cylindrical motor (PWM capable)   |
| Power Supply          | LiPo battery or USB                          |
| Resistor (optional)   | 10kΩ pull-down for button                    |
| LED (optional)        | Debug/diagnostic light (optional)            |
| Enclosure             | 3D printed or custom casing                  |

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ChasChallangeIII/NeverAlone-IoT
cd NeverAlone-IoT
