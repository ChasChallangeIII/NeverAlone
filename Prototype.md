# Prototype Phase (Weeks 14-17)

## Frontend  
### Goals for the Prototype Phase:  
- Research and initial design sketches  
- Implement basic UI and essential features  
- Establish fundamental data flow between the mobile app and the backend  

### Timeline & Tasks  

#### **Week 14-15**  
- Conduct **preliminary research**  
- Create **user personas**  
- Gather inspiration from websites and apps  
- Start **Figma sketches**  

#### **Week 16**  
- Begin **mobile app development**  
- Implement **basic layout** with all pages and simple features  
- Develop **fake call button**  
- Ensure **data submission** to the server on form submit and fake call request  

#### **Week 17**  
- Start working on the **Admin Panel**  
- Visualize basic **statistics**  

---

## Fullstack  
### Goals for the Prototype Phase:  
- Establish backend structure and ensure data flow  
- Implement user authentication and basic API endpoints  

### Timeline & Tasks  

#### **Week 14**  
- Discuss **system architecture** for Node.js (file and folder structure)  
- Define **API endpoints** (e.g., `/signup`)  
- Set up **Node.js** to retrieve data (e.g., `http://localhost:3000/data`)  

#### **Week 15**  
- Explore **Express.js**  
- Understand **middleware** (e.g., `app.post("/signup", validateData, signUp)`) and **routers** (e.g., `authRouter`, `signalRouter`)  
- Establish **client-server data transmission**  

#### **Week 16**  
- Implement **environment variables** (`.env` file for sensitive data such as database passwords)  
- Set up **PostgreSQL** (store and retrieve user data)  

#### **Week 17**  
- Implement **basic authentication** (JWT and HTTP-only cookies for login)  
- Finalize **system architecture**  

---

## SUVX (IoT Team)  
### Goals for the Prototype Phase:  
- Develop a working hardware prototype  
- Establish communication between the device and the mobile app  

### Timeline & Tasks  

#### **Week 14 – Basic Functionality**  
- Set up **Arduino environment** and select a suitable microcontroller  
- Connect a **tactile button** and read button presses  
- Implement **haptic feedback** with a vibration motor on button press  
- Create **basic serial logging** to verify button press detection  

#### **Week 15 – Mobile App Communication**  
- Implement **Bluetooth communication** between the IoT device and the mobile app  
- Send a **dummy signal** from the button to the mobile app upon press  
- Test **signal reception** in the app and display a log/notification  

#### **Week 16 – Offline Functionality & Data Management**  
- Implement a **buffer function** to store button presses if no Bluetooth connection is available  
- Test **data transmission** upon next connection  
- Simulate **different user scenarios** to test robustness  

#### **Week 17 – Evaluation and Preparation for MVP**  
- Document **code, schematics, and test results**  
- Identify **strengths and areas for improvement**  
- Sketch **design refinements** for the next prototype iteration  
