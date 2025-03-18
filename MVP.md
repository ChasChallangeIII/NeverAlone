# Minimum Viable Product (MVP)

## Frontend
### Features (Both MVP and Non-MVP):
- Login/Logout/Create Account
- Settings (TBD)
- Add Contacts Functionality
- Submit Data (Location, Date, Time, and Possibly User) to the Server via a Form
- Fake Call Button
- Recording Function
- Notification Feature to Alert Users if Their Contacts Are in Danger and Their Location
- Admin Panel: View Statistics on Unsafe Situations

### MVP Features:
- Submit Data (Location, Date, Time, and Possibly User) via a Form to the Server
- Fake Call Button
- Admin Panel: View Statistics on Unsafe Situations

### Timeline:
#### Week 14-15
- Preliminary Research
- Create User Personas
- Gather Inspiration from Websites and Apps
- Start Figma Sketches

#### Week 16
- Begin Mobile App Development
- Implement Basic Layout with All Pages and Simple Features
- Develop Fake Call Button
- Ensure Data Submission to Server on Form Submit and Fake Call Request

#### Week 17
- Work on Admin Panel
- Visualize Statistics

---

## Fullstack
### Timeline:
#### Week 14
- Discuss System Architecture for Node.js (File and Folder Structure)
- Define API Endpoints (e.g., `/signup`)
- Set Up Node.js to Retrieve Data (e.g., `http://localhost:3000/data`)

#### Week 15
- Explore Express.js
- Understand Middleware (e.g., `app.post("/signup", validateData, signUp)`) and Routers (e.g., `authRouter`, `signalRouter`)
- Establish Client-Server Data Transmission

#### Week 16
- Implement Environment Variables (`.env` File for Sensitive Data Such as Database Passwords)
- Set Up PostgreSQL (Understand Database Usage, Add and Retrieve Data)

#### Week 17
- Implement Authentication (JWT and HTTP-Only Cookies for Login)
- Finalize System Architecture

---

## SUVX
### Problem:
Many IoT devices require complex interfaces or screens for interaction, which can be impractical in certain user situations. Our goal is to create a minimalist and responsive button that can wirelessly send signals to a mobile app and provide immediate haptic feedback.

### Solution:
A wireless button with haptic feedback and Bluetooth communication that stores button presses offline and syncs them with a mobile app upon reconnection.

### Core Features in MVP:
#### Basic Interaction:
- A physical button registers presses
- A vibration motor provides immediate haptic feedback

#### Wireless Communication:
- Button presses are sent via Bluetooth LE to a mobile app
- If no connection is available, button presses are stored locally and sent upon reconnection

#### Simple Data Management:
- The mobile app receives and logs button presses
- Basic UI to display events and notifications

### Timeline:
#### Week 14 – Basic Functionality
- Set up Arduino environment and select a suitable microcontroller
- Connect a tactile button and read button presses
- Implement haptic feedback with a vibration motor on button press
- Create basic serial logging to verify button press detection

#### Week 15 – Mobile App Communication
- Implement Bluetooth communication between Arduino and mobile app (via Serial Bluetooth or BLE)
- Send a dummy signal from the button to the mobile app upon press
- Test signal reception in the app and display a log/notification

#### Week 16 – Offline Functionality & Data Management
- Implement a buffer function to store button presses locally if no Bluetooth connection is available
- Test data transmission upon next connection
- Simulate different user scenarios to test robustness (e.g., multiple presses, Bluetooth on/off)

#### Week 17 – Evaluation and Preparation for Prototype 2
- Document code, schematics, and test results
- Identify strengths and areas for improvement in the next prototype
- Sketch design changes to make the hardware more compact and ready for Prototype 2

### Next Steps After MVP:
After testing and validating the MVP, we will improve the design, durability, and user experience to make the device more robust, energy-efficient, and ready for further real-world testing.

#### 1. PCB Design and Production
- Replace loose components with a custom PCB for improved reliability and compact design
- Confirm component choices (ESP32-C3 Mini, button, vibration motor, LiPo battery, charging circuit, Bluetooth LE)
- Create schematics and layout in KiCad or EasyEDA
- Produce and test an initial batch of PCBs
- Ensure all components work together through extensive hardware testing

#### 2. Battery Consumption Optimization
- Maximize battery life through efficient coding and hardware management
- Implement deep sleep mode on ESP32-C3 when the button is inactive
- Adjust wake-up mechanisms to balance energy saving and fast response
- Measure and analyze power consumption in different scenarios
- Iterate power management based on test results

#### 3. 3D-Printed Casing and Ergonomics
- Protect hardware and enhance user experience through a custom enclosure
- Design a durable and compact casing in CAD software (Fusion 360 or Onshape)
- 3D print prototypes and adjust the form factor for optimal usability
- Ensure the casing does not affect button response, vibration feedback, or Bluetooth signal
- Test different materials and mechanical solutions (e.g., snap-fit vs. screw mounting)

#### 4. Field Testing and Iterative Improvement
- Validate the product in real user scenarios and adjust based on feedback
- Conduct tests with real users in different environments (e.g., indoors, outdoors, with gloves)
- Analyze logged data to identify issues with response, connectivity, or battery life
- Adjust firmware, PCB design, and casing based on test results
- Document insights and define the next development phase (Pilot Production, CE Certification, etc.)
