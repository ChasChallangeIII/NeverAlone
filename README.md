# **Never Alone** – Chas Challenge 2025

## **Project Overview**
Never Alone is a smart safety solution designed to help individuals feel more secure in public spaces. By pressing a discreet IoT button, users trigger an incoming call simulation, making them appear occupied. They can later fill out a survey in the mobile app to describe why they felt unsafe. Anonymized data can be shared with municipalities to improve urban safety measures.

## **Features**
- **One-Tap Safety** – Press the button to receive a simulated call and appear busy.
- **Survey Submission** – Users can describe their experience in a quick survey via the app.
- **Data Insights** – Anonymous reports help municipalities identify unsafe areas.
- **Cross-Platform App** – Available on mobile devices with a clean and intuitive UI.
- **IoT-Enabled Button** – Physical hardware integration for seamless interaction.
- **Real-Time Data Sharing** – Municipalities and organizations can access statistical reports on unsafe areas.
- **Customizable Notifications** – Users can set up emergency contacts for additional security.
- **Offline Functionality** – The button works even without internet access, sending data once connected.

## **Tech Stack**
### **Frontend (Mobile App)**
- React Native
- TypeScript
- Expo
- Redux for state management
- Firebase for authentication and notifications

### **Backend (API & Database)**
- Node.js with Express
- PostgreSQL
- Firebase Authentication
- RESTful API for communication
- WebSockets for real-time updates

### **IoT System (Button & Sensors)**
- ESP32 / Raspberry Pi
- MQTT for communication
- Python for embedded programming
- Low-power Bluetooth/WiFi connectivity
- Haptic feedback for button press confirmation

## **Installation & Setup**

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/never-alone.git
   cd never-alone/backend
   ```  
2. Install dependencies:
   ```bash
   npm install
   ```  
3. Configure environment variables (create a `.env` file):
   ```env
   DATABASE_URL=your_database_url
   FIREBASE_CONFIG=your_firebase_config
   ```  
4. Start the server:
   ```bash
   npm start
   ```  

### **Frontend Setup**
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```  
2. Install dependencies:
   ```bash
   npm install
   ```  
3. Run the application:
   ```bash
   npm start
   ```  
4. Configure the `.env` file for API integration:
   ```env
   REACT_APP_API_URL=your_backend_api_url
   ```

### **IoT Device Setup**
1. Flash the ESP32/Raspberry Pi with the provided firmware.
2. Configure the MQTT broker and WiFi credentials.
3. Test button presses and data transmission.
4. Ensure the button sends signals to the mobile app and backend.

## **Usage**
1. **Press the IoT button** – A simulated call is triggered on the user’s phone.
2. **Open the mobile app** – Users receive a notification to fill out a survey.
3. **Submit feedback** – Data is anonymously logged and sent to relevant authorities.
4. **View insights** – Municipalities can analyze reports to identify high-risk areas.

## **API Endpoints**
### **User Authentication**
- `POST /auth/signup` – Register a new user
- `POST /auth/login` – Log in an existing user
- `POST /auth/logout` – Log out user

### **Safety Reports**
- `POST /reports` – Submit a new safety report
- `GET /reports` – Retrieve all reports (admin access)
- `GET /reports/:id` – Get report details

### **Device Communication**
- `POST /device/register` – Register an IoT button
- `POST /device/signal` – Send signal when button is pressed
- `GET /device/status` – Check device connectivity

## **Contributing**
We welcome contributions! To contribute:
1. Fork the repo
2. Create a new feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

## **License**
This project is licensed under the MIT License.
---

