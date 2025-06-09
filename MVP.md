# Minimum Viable Product (MVP) (Weeks 17-21)

## Frontend

### Goals for the MVP Phase:

- Fully functional mobile app with core features
- Working Admin Panel for data visualization
- Finalized UI based on user feedback

### MVP Features:

- Submit **data (location, date, time, user ID)** via a form to the server
- **Fake Call Button** implementation
- **Admin Panel:** View **statistics on unsafe situations**

### Timeline & Tasks

#### **Week 17-18**

- Finalize **mobile app layout and functionality**
- Ensure **data submission** works seamlessly
- Work on **Admin Panel UI**

#### **Week 19-20**

- Implement **recording function**
- Develop **notification feature** (alert users if their contacts are in danger)
- Improve **data visualization** in the Admin Panel

#### **Week 21**

- Conduct **final testing and optimizations**
- Ensure all MVP features work as intended

---

## Fullstack

### Goals for the MVP Phase:

- Implement authentication and secure data storage
- Deploy backend to handle user requests and store location data

### Timeline & Tasks

#### **Week 17-18**

- Implement **user authentication** (JWT and HTTP-only cookies)
- Finalize **API endpoints** for frontend integration
- Store **user-submitted data** securely in PostgreSQL

#### **Week 19-20**

- Enhance **database queries** for optimized data retrieval
- Improve **API security** and access control

#### **Week 21**

- Deploy the **backend and database**
- Conduct **final testing and bug fixes**

---

## SUVX (IoT Team)

### Goals for the MVP Phase:

- Ensure **stable Bluetooth communication** between the button and the app
- Implement **offline storage** for button presses
- Finalize **basic data logging** and user notifications

### Timeline & Tasks

#### **Week 17-18**

- Improve **button press recognition** and **haptic feedback**
- Implement **Bluetooth signal improvements**

#### **Week 19-20**

- Finalize **ESP32 Bluetooth communication** with the mobile app
- Coordinate with frontend team to ensure **message reception** from the ESP32
- Format button press messages for easy parsing (e.g., "BTN_PRESS")
- Begin implementing **mobile-side timestamp and geolocation capture**
- Verify real-time data logging via mobile debugging tools

#### **Week 21**

- Implement **GPS and system time retrieval** on the mobile app
- Store **button press events with timestamp and geolocation**
- Test basic offline behavior (e.g., delayed connection or data queuing)
- Refine UI to display event logs or confirmation of receipt

#### **Week 22**

- Perform **end-to-end integration testing**
- Fix bugs in **Bluetooth communication**, **data logging**, or **UI**
- Prepare **presentation materials** and **demo walkthrough**
- Create a **backup demo (video or screenshots)** in case of live issues

#### **Week 23 (Demo Week)**  
* - Demo the system: button press → Bluetooth signal → mobile log with time and location  
* - Highlight **technical achievements**, **challenges**, and **future plans**  
* - Emphasize design pivot to **breadboard prototype** due to hardware delay  
* - Showcase potential **MVP directions** for post-demo development

### Future plans

- Implement **Hauptic feedback** with a hauptic sensor for the discrete button
- Implement basic **offline behavior** (e.g., delayed connection or data queuing)
- Make it **compatible with iOS**
- Implement low power design using deep sleep mode

