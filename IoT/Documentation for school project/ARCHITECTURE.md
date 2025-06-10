# Architecture – NeverAlone

## Overview
The project consists of three main components:

### 1. **IoT Button**
- ESP32 using C++
- BLE (Bluetooth Low Energy) communication
- Sends "Short" or "Long" press signals
- Can store events offline if disconnected

### 2. **Mobile App (React Native)**
- Listens for BLE events and simulates a phone call
- Collects user surveys
- Sends data to the backend

### 3. **Backend (Node.js + Express)**
- REST API for submitting and retrieving data
- PostgreSQL for data storage
- WebSockets for real-time updates (e.g., admin panel)

## Communication
- BLE between the IoT device and the mobile app
- HTTPS/REST between the mobile app and the server
