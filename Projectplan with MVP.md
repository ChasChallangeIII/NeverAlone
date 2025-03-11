# Never Alone – Chas Challenge 2025

## Project Overview

**Never Alone** is a smart safety solution designed to increase personal security in public spaces. The system includes an **IoT button** that simulates an incoming call, making users appear occupied in unsafe situations. After using the button, users submit a survey describing their experience, and this anonymized data is made available to municipalities to help improve urban safety measures.

For the **MVP**, the focus is on the **B2B functionality**: providing municipalities with **statistical insights** about unsafe areas based on user-submitted survey data. The app and button will be developed with basic functionality to collect and report data, and user-facing features will be secondary during this phase.

---

## MVP Goals (6 Weeks Focus)

The **primary goal** of the MVP is to develop the features that allow municipalities to access **anonymized statistical reports** and **survey data** submitted by users. This will help demonstrate the value of the system to authorities, allowing them to identify unsafe areas and take action.

### Core Features for MVP

1. **IoT Button Functionality**
   - **Button Press Simulation:** When the button is pressed, it triggers a simulated incoming call on the user’s mobile device.
   - **Offline Capability:** The button stores data offline and syncs with the app when connected to the internet.
   - **Haptic Feedback:** The button provides vibration feedback upon pressing.

2. **Mobile App (Frontend)**
   - **Survey Submission:** After pressing the IoT button, users are prompted to fill out a short survey describing why they felt unsafe.
   - **Anonymized Data Submission:** Ensure survey data is anonymized to protect user privacy.
   - **User Authentication:** Simple sign-up/login using **Firebase Authentication**.

3. **Backend (API & Database)**
   - **Survey Data Collection:** Store survey responses in **PostgreSQL** and ensure they are anonymized.
   - **CSV Export for Municipalities:** Allow authorities to export **anonymized survey data** in **CSV format**.
   - **Basic Reporting System:** Provide simple reporting functionality (e.g., total survey submissions, geographic hotspots).

4. **B2B Reporting Interface**
   - **CSV Export:** Municipalities can download aggregated data (survey counts, geographical trends) in CSV format.
   - **Simple Statistical Insights:** Create basic statistics such as the number of reported unsafe areas and the reasons for unsafe situations.

---

## Full Project Timeline (3-Month Plan)

The full project spans **3 months**, with the MVP delivered in **6 weeks** and the remaining time used to refine the product, enhance the user interface, and improve the system's scalability. 

### **Month 1: MVP Development (6 Weeks)**

#### **Focus:**
- Develop the IoT button, mobile app, backend, and the statistical reporting system for municipalities.
- Ensure that municipalities can access basic aggregated survey data in CSV format.

#### **Deliverables:**
1. **IoT Button (Prototype)**:
   - Build the IoT button with **ESP32/Arduino** or similar hardware.
   - Implement **offline functionality** and Bluetooth/Wi-Fi connectivity with the mobile app.
   - Provide **haptic feedback** on button press.

2. **Mobile App (Frontend - Phase 1)**:
   - **Survey System**: After pressing the button, prompt users to fill out a short survey describing their unsafe experience.
   - **User Authentication**: Implement Firebase Authentication for sign-up/login.
   - **Survey Data Submission**: Store data securely, ensuring **anonymization** of responses.

3. **Backend Development (Phase 1)**:
   - Set up **PostgreSQL** for survey data storage.
   - Create a **RESTful API** to handle survey submissions and export requests.
   - Implement **CSV export functionality** for municipalities to download anonymized data.

4. **B2B Reporting System**:
   - Build **basic reporting functionality** for authorities, allowing them to export anonymized data in CSV format.
   - Provide **simple statistics** on the number of reported incidents and any identified hotspots.

#### **Week 1-6 Timeline:**
- **Week 1-2:** Develop IoT button prototype and basic mobile app features (survey, button integration).
- **Week 3-4:** Set up the backend, survey data submission, and CSV export functionality.
- **Week 5-6:** Implement B2B reporting system (CSV export) and initial statistical insights.

---

### **Month 2: Refinement and Feedback (Weeks 7-8)**

#### **Focus:**
- Test the MVP features with internal users and initial B2B clients.
- Refine statistical insights and reporting based on feedback.
- Ensure data syncing works reliably when the IoT button is offline and then reconnects to the internet.

#### **Deliverables:**
1. **Bug Fixes and Refinements**:
   - Address issues identified during MVP testing (app functionality, button reliability, survey submission).
   - Improve **offline data syncing** between the IoT button and the app.
   
2. **Enhanced Reporting**:
   - Improve the **B2B reporting interface**, including more detailed insights and basic visualizations (e.g., charts showing hotspots).
   - Continue providing **CSV export** functionality for municipal authorities.

3. **Testing and Feedback**:
   - Conduct user testing with both **internal testers** and **municipal partners** to ensure smooth data collection and reporting.
   - Gather feedback on the user interface and statistical insights.

---

### **Month 3: Final Enhancements and Deployment (Weeks 9-12)**

#### **Focus:**
- Finalize the app for public release.
- Implement additional features based on feedback from MVP users.
- Enhance scalability and performance of the system.
- Provide municipalities with access to more advanced reports.

#### **Deliverables:**
1. **App Enhancements**:
   - Improve **UI/UX** for both the mobile app and B2B reporting interface.
   - Implement **notification system** to alert users when surveys are successfully submitted.
   - **Scalability improvements** to ensure the system can handle a growing user base.

2. **Advanced B2B Reporting**:
   - Create more detailed and advanced **statistical reports** for municipalities.
   - Consider adding **heatmaps** or **geographic mapping** to visualize unsafe areas (future enhancement after initial feedback).
   
3. **Public Launch Preparation**:
   - Final testing of the entire system (IoT button → app → survey → data export).
   - Prepare the system for a **wider public launch** with scalability in mind.

4. **Deployment**:
   - Deploy the mobile app to **App Store** and **Google Play Store** (if applicable).
   - Deploy backend to production (e.g., **AWS**, **Heroku**) for scaling.

#### **Week 9-12 Timeline:**
- **Week 9-10:** Finalize statistical reports and improve user interface.
- **Week 11:** Final testing and bug fixes.
- **Week 12:** Deployment and preparation for public launch.

---

## MVP Success Criteria

1. **IoT Button Functionality**: Button reliably triggers a simulated call and stores data offline.
2. **Survey Submission**: Users can submit a survey describing their experience after pressing the IoT button.
3. **Anonymized Data**: Survey data is anonymized and stored securely.
4. **CSV Export**: Municipalities can download anonymized survey data in CSV format.
5. **Basic Statistical Insights**: Provide simple insights into unsafe areas (e.g., number of reports, areas with the most incidents).

---

## Tech Stack

### **Frontend (Mobile App)**:
- **React Native** for cross-platform development.
- **TypeScript** for type safety and better maintainability.
- **Firebase Authentication** for user authentication.

### **Backend (API & Database)**:
- **Node.js** with **Express** for building the API.
- **PostgreSQL** for data storage.
- **RESTful API** for survey submission and report generation.
- **CSV export** for data download.

### **IoT System (Button & Sensors)**:
- **ESP32/Arduino** for IoT button hardware.
- **Bluetooth** for communication with the mobile app.
- **C++** for embedded programming on the IoT button.

---

## Timeline Summary

| **Phase**       | **Key Goals & Deliverables**                                    | **Duration**    |
|-----------------|------------------------------------------------------------------|-----------------|
| **Month 1**     | MVP Development: Focus on IoT button, mobile app, backend, and CSV export for municipalities | 6 weeks         |
| **Month 2**     | Refinement: Bug fixing, enhanced reporting, and user testing     | 4 weeks         |
| **Month 3**     | Final enhancements, scalability, and deployment preparation      | 4 weeks         |

---
