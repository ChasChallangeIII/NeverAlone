# Testing – NeverAlone

This file outlines the informal testing and verification methods used during development of the IoT-part of the NeverAlone project.

## Overview

While we did not implement automated or formal tests, we continuously tested the system manually to ensure functionality. Testing mainly focused on the BLE communication between the IoT button and the mobile app.

## What We Tested

### 1. IoT Button (ESP32)
- **Button press detection**: Verified short and long presses were correctly registered.
- **BLE advertising and connection**: Tested pairing with mobile devices.
- **BLE message sending**: Confirmed that BLE signal were received by the app.
- **Offline storage**: Simulated button presses while disconnected and checked that events were queued and sent upon reconnection.
- **LED feedback**: Verified that LED behavior matched expected press duration.

## Limitations
- No unit or integration tests were written.
- BLE functionality was only tested on Android devices; iOS support was not verified.

## Future Testing Plans
If continued, we would like to:
- Write unit tests for embedded logic on the ESP32.
- Test BLE stability under different conditions and platforms.

