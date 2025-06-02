# **Never Alone** – Chas Challenge 2025

## **Project Overview**
Never Alone is a smart safety solution designed to help individuals feel more secure in public spaces. By pressing a discreet IoT button, users trigger an incoming call simulation, making them appear occupied. They can later fill out a survey in the mobile app to describe why they felt unsafe. Anonymized data can be shared with municipalities to improve urban safety measures.

## **Features**
- **One-Tap Safety** – Press the button to receive a simulated call and appear busy.
- **Survey Submission** – Users will fill in surveys at a later time explaining why they pressed the button.
- **Data Insights** – The survey reports help municipalities identify unsafe areas.
- **Cross-Platform App** – Available on mobile devices with a clean and intuitive UI.
- **IoT-Enabled Button** – Physical hardware integration for seamless interaction.
- **Real-Time Data Sharing** – Municipalities and organizations can access statistical reports on unsafe areas.
- **Customizable Notifications** – Users can set up emergency contacts for additional security.
- **Offline Functionality** – The button works even without internet access, sending data once connected.

## **Tech Stack**
### **Frontend (Mobile App)**
- React Native
- Javascript
- Context API for state management
- Figma

### **Backend (API & Database)**
- Node.js with Express
- PostgreSQL
- RESTful API for communication
- WebSockets for real-time updates

### **IoT System (Button & Sensors)**
- Arduino / ESP32
- C++ for embedded programming
- Low-power Bluetooth connectivity
- Haptic feedback for button press confirmation

---

## 📦 **Gradle APK Installation Guide**

This guide explains how to generate and install an APK using Gradle in an Android project.

### **Prerequisites**
Before you begin, ensure you have the following installed:

- Android Studio  
- Android SDK  
- Java Development Kit (JDK)  
- Gradle (bundled with Android Studio)  

### **Step 1: Build the APK**

Use Gradle to build the APK from the command line:
Before building the APK, you need to navigate to the android/ folder of the project:

```bash
cd android
```

#### **Option A: Build Debug APK**
```bash
./gradlew assembleDebug
```

#### **Option B: Build Release APK**
```bash
./gradlew assembleRelease
```

After building, you’ll find the APK in:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📱 **Download APK**

Scan the QR code below to download the latest release APK:

![Download APK QR Code](./408ff6bf-b8c9-443a-89cd-cdce6ccf3735.png)
---

## 🔗 **Other Project Modules**

- [📡 Server](https://github.com/ChasChallangeIII/NeverAlone/blob/main/server/README.md)
- [🛠️ Admin Panel](https://github.com/ChasChallangeIII/NeverAlone/blob/main/adminpanel/README.md)
- [📲 Mobile App](./never-alone-app/README.md)
- [🔘 IoT Button](https://github.com/ChasChallangeIII/NeverAlone/blob/main/IoT/README.md)
