# Never Alone – Chas Challenge 2025: MVP

## Project Overview

**Never Alone** is a smart safety solution designed to help individuals feel more secure in public spaces. The key feature is a discreet IoT button that, when pressed, simulates an incoming call, making users appear occupied. This can help them avoid unwanted attention in unsafe situations. The app collects user-reported data about these situations and shares anonymized insights with authorities/municipalities to help improve urban safety.

## MVP Goal

The MVP aims to build a **basic version** of the safety system that includes:
1. A **simple user interface** for mobile devices.
2. A **physical IoT button** to simulate an incoming call.
3. A **survey system** to capture user experiences of unsafe situations.
4. **Basic data storage** and **municipality access** for safety improvement insights.

## Key Features for MVP

### 1. **IoT Button Functionality**
- **Press-to-Simulate Call:** When the user presses the IoT button, it triggers a simulated incoming call on their device (audio or vibration).
- **Offline Mode:** The button works offline and sends data to the app when it reconnects to the internet.
- **Haptic Feedback:** Provide feedback (vibration or sound) confirming that the button was pressed.

### 2. **Mobile App (Frontend)**
- **User Authentication:** Use Firebase Authentication for users to sign in or register.
- **Main Interface:**
  - A simple button that simulates an incoming call.
  - Display a quick survey asking why the user felt unsafe.
  - Basic notifications when surveys are submitted.
- **Survey Interface:** A simple form where users can anonymously report why they felt unsafe.

### 3. **Survey Submission**
- **Survey:** A short, text-based survey after the button press that asks:
  - "What made you feel unsafe?"
  - Optionally, a rating for how unsafe they felt (e.g., 1-5 scale).
- **Data Anonymity:** Data is anonymized before being stored.

### 4. **Backend (API & Database)**
- **Survey Data Storage:** Store survey responses and user data (e.g., location, time) in a PostgreSQL database.
- **RESTful API:** Basic API to handle survey data submission and user authentication.
- **Admin Panel (Basic):** A simple backend dashboard (or CSV exports) for municipalities to access aggregated, anonymized survey data.

### 5. **Cross-Platform App**
- **React Native App:** A cross-platform app that runs on both iOS and Android with basic functionality:
  - Ability to pair the IoT button.
  - Receive simulated calls.
  - Submit surveys after each call simulation.
  
### 6. **Basic Data Insights**
- **Municipal Data Access (MVP):**
  - Provide municipalities with access to aggregated survey data (e.g., via downloadable CSV) for safety improvement.
  - Basic report generation: total number of button presses, survey feedback summaries.

### 7. **Tech Stack**
#### Frontend (Mobile App)
- **React Native** for cross-platform development.
- **TypeScript** for type safety.
- **Redux** for state management (user authentication, survey states).
- **Firebase** for authentication and notifications.

#### Backend (API & Database)
- **Node.js & Express** for API development.
- **PostgreSQL** for survey data storage.
- **Firebase Authentication** for secure user authentication.
- **RESTful API** for communication between the app and backend.

#### IoT System (Button & Sensors)
- **ESP32/Arduino** for button hardware.
- **MQTT/Bluetooth Low Energy (BLE)** for communication between the button and app.
- **C++** for embedded programming on the IoT button.
- **Low-Power Mode** for extended battery life.
- **Haptic Feedback** for user confirmation.

## User Flow

1. **User Registration & Sign-In:**
   - The user signs up or logs into the app using Firebase Authentication.
   - They are prompted to connect their IoT button via Bluetooth or Wi-Fi.

2. **Button Press:**
   - In an unsafe situation, the user presses the IoT button to simulate an incoming call.
   - The button triggers haptic feedback to confirm the press.

3. **Survey Submission:**
   - After the button press, the app asks the user to complete a short survey (why did they feel unsafe?).
   - The user submits the survey, and the data is stored in the backend.

4. **Data Aggregation & Reporting:**
   - The data is aggregated, anonymized, and stored in the database.
   - Basic insights are available for municipalities, either via CSV download or simple report generation.

## MVP Priorities
1. **Core Safety Feature:** Ensure the IoT button works reliably, providing users with immediate feedback when pressed.
2. **Simple & Intuitive App:** Build a basic but clean app interface for users to interact with the button and submit surveys.
3. **Data Collection & Privacy:** Ensure survey data is collected in a privacy-preserving manner (anonymized), and provide basic access to municipalities.
4. **Offline Capability:** Ensure the button works without internet access, syncing data when the device reconnects.

## MVP Success Criteria
- Users can successfully press the button, receive call simulation feedback, and complete a survey.
- The app can store and display submitted survey data.
- Basic, anonymized reports can be generated for municipalities.
- Users have a smooth, intuitive experience on both Android and iOS.

## Future Iterations (Beyond MVP)
1. **Enhanced Reporting & Insights:** Create more detailed analytics dashboards for municipalities.
2. **Real-Time Data Updates:** Implement real-time updates via WebSockets to give municipalities up-to-date information on unsafe areas.
3. **Advanced Features:**
   - Geolocation tagging to report unsafe areas.
   - Emergency contact notification (send alerts to a designated contact).
   - Integration with other safety systems (e.g., local emergency services).
   
## Tech Timeline (MVP Development)
### **Phase 1: Setup & Core Development (1-2 months)**
- Set up the IoT button and ensure communication between the device and app.
- Build out the mobile app interface for basic functionality (sign-up, button press, survey submission).
- Develop the backend API to handle survey data storage.

### **Phase 2: Testing & Feedback (1 month)**
- Test button functionality and survey submission process.
- Collect feedback from a small group of users to ensure the system works as expected.
- Adjust user interface and UX based on feedback.

### **Phase 3: Launch MVP (1 month)**
- Final testing of IoT button and mobile app interaction.
- Deploy the app on the App Store and Google Play Store.
- Provide municipalities with access to basic data (via CSV download).

---

By keeping the MVP simple and focused on key features, you’ll be able to quickly test the core concept and gather feedback for future iterations.
