# NeverAlone IoT Button

The **NeverAlone IoT Button** is a compact and discreet ESP32-based device that enhances personal safety in public spaces. With a single press, it sends a BLE signal to a paired mobile device, triggering a simulated call. It features haptic feedback, offline logging, and low-power design, and integrates seamlessly with the NeverAlone mobile app.

This repository contains the firmware for the button, written in C++ and built using [PlatformIO](https://platformio.org/).

---

## 🔧 Features

- **One-Tap Activation** – Sends a BLE event to trigger safety features on the mobile app.
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


---

## 📦 # NeverAlone IoT – Developer Setup Guide

### 1. Clone the Repository

git clone https://github.com/ChasChallangeIII/NeverAlone
cd IoT

## 🛠️ 2. Install PlatformIO

### Visual Studio Code (Recommended)

1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Open VS Code and go to the **Extensions** panel.
3. Search for and install **PlatformIO IDE**.
4. Restart VS Code once the installation is complete.

# Wiring Instructions

To assemble the **NeverAlone IoT Button**, connect the components as follows:

---

## Required Components

| Component       | ESP32 GPIO Pin | Details                                                                 |
|----------------|----------------|-------------------------------------------------------------------------|
| Push Button     | GPIO 0         | Connect one leg to GPIO 0, the other to GND. Use a 10kΩ pull-down resistor if needed. |
| Vibration Motor | GPIO 4         | Use a transistor or MOSFET if necessary. Connect the other leg to GND. |
| Power Supply    | 3.3V / VIN     | Use USB or LiPo battery depending on your board.                       |
| Common Ground   | GND            | Ensure all components share the same ground as the ESP32.              |
| Buzzer          | Audio feedback (if needed) | GPIO 15   |
---


> **Note:** Always check your specific ESP32 dev board pinout before connecting components.

##3. Build & Upload Firmware
Connect your ESP32 device via USB, then run "platformio run" in the command line to Upload to the ESP32


### Monitor Serial Output (Optional)
To debug or view logs:

platformio device monitor
