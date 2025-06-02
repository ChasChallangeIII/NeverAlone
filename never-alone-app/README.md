# NeverAlone Mobile App

The **NeverAlone Mobile App** is a cross-platform React Native application that connects with the NeverAlone IoT Button to provide users with discreet personal safety features. When the button is pressed, the app simulates an incoming call and allows users to submit an anonymous survey to help improve public safety in their communities.

---

##  Features

- **Simulated Call** – Triggered via Bluetooth from the IoT button
- **User Survey** – Quick, anonymous report of why the button was pressed
- **BLE Communication** – Seamless Bluetooth Low Energy integration with the ESP32 button
- **Offline Support** – Stores events locally and syncs when back online
- **Real-Time Reporting** – Anonymized safety data sent to municipal backend
- **Custom Settings** – Users can configure emergency contacts and notification styles

---

## Tech Stack

| Layer        | Technology                 |
|--------------|----------------------------|
| Frontend     | React Native, JavaScript   |
| State Mgmt   | Context API                |
| UI Design    | Figma                      |
| Bluetooth    | `react-native-ble-plx`     |
| Networking   | Axios (REST API)           |
| Backend API  | Node.js + Express (remote) |
| Database     | PostgreSQL (remote)        |

---

##  Getting Started

### 1. Clone the Repository

- **git clone https://github.com/ChasChallangeIII/NeverAlone
- **cd app


### 2. Install Dependencies
Make sure you have npm or yarn installed:
npm install
# or
yarn install

### 3. Create Environment Variables
Create a .env file in the root of the project and add the following:

- API_BASE_URL=https://your-api-url.com
- BLE_SERVICE_UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
- BLE_CHARACTERISTIC_UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

Replace with your actual backend endpoint and BLE service/characteristic UUIDs.

### 4. Running the App
iOS

- npx pod-install
- npx react-native run-ios

Make sure you have Xcode installed and configured.

Android

- **npx react-native run-android
- **Requires Android Studio and emulator/device setup.

##  Folder Structure
app/
├── assets/              # Images, icons, fonts
├── components/          # Reusable UI components
├── contexts/            # React Context providers
├── screens/             # Application screens (Survey, Home, Settings)
├── services/            # BLE communication, API requests
├── utils/               # Helper functions and constants
├── App.js               # Root of the application
└── ...

## How to Build an APK (Android)
### 1. Prerequisites
Make sure you have the following installed:

- Android Studio with SDK & Build Tools
- Java Development Kit (JDK) – JDK 11 recommended
- React Native CLI (not Expo)

Environment variables set:

- JAVA_HOME
- ANDROID_HOME

### 1. Navigate to Your Project
- cd path/to/your/neveralone-app

### 2. Set Up Environment for Build
Clean the build cache (optional but recommended):

- cd android
- ./gradlew clean

###  3. Build a Debug APK
Use this if you don’t need signing yet (e.g., for internal testing):

- ./gradlew assembleDebug
- The APK will be generated at: android/app/build/outputs/apk/debug/app-debug.apk

### 4. Build a Release APK 
Use this to generate a performance-optimized APK for stakeholder demos, internal distribution, or preparing for app store deployment:

- ./gradlew assembleRelease
- The signed APK will be generated at: android/app/build/outputs/apk/release/app-release.apk

### 5. Install the APK on a Device (Optional)
Make sure USB debugging is enabled on your Android device and run:
- adb install app-release.apk
- Or drag the .apk file to your emulator or device.

## Install APK via QR code or link

###
If you are not a developer and want to try the app you can download an APK via this link: https://drive.google.com/file/d/1-6ZUxQ8wZTmUFPNDRTfz4qZsRKQyMKzK/view?usp=drive_link

Or you can use this QR code
<img src="./Never-Alone-App-QR.jpg" alt="Download APK QR Code" width="300"/>

