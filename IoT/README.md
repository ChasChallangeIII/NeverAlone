# NeverAlone IoT Button

The **NeverAlone IoT Button** is a compact and discreet ESP32-based device that enhances personal safety in public spaces. With a single press, it sends a BLE signal to a paired mobile device, triggering a simulated call. It features offline logging, and low-power design, and integrates seamlessly with the NeverAlone mobile app.

This repository contains the firmware for the button, written in C++ and built using [PlatformIO](https://platformio.org/).

---

## Features

- **One-Tap Activation** – Sends a BLE event to trigger safety features on the mobile app.
- **Low Power Design** (Not yet implemented) – Utilizes ESP32’s deep sleep mode for extended battery life. 
- **BLE Communication** – Efficient communication over Bluetooth Low Energy.

---

##  Hardware Requirements

| Component             | Description                                        |
|-----------------------|----------------------------------------------------|
| ESP32 Dev Board       | e.g., ESP32-C3                                     |
| Tactile Push Button   | Connected to a GPIO for input                      |
| Power Supply          | LiPo battery or USB                                |
| Resistor (optional)   | 10kΩ pull-down for button                          |
| LED                   | Optional (Used currently instead of haptic feedback)|

---
## User Guide

See [Developer Setup Guide](https://github.com/ChasChallangeIII/NeverAlone/blob/main/IoT/DeveloperSetupGuide.md) for information of how to setup the project with the IoT hardware.

---

Further documentation press [here](https://github.com/ChasChallangeIII/NeverAlone/tree/main/IoT/Documentation%20for%20school%20project)
