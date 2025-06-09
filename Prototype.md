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

### Project Timeline & Tasks

#### **Week 14 – Research, Planning & Simulated Build**

* **Research & Planning:**
    * [x] Define the essential features and functionality for the initial prototype.
    * [x] Research suitable components, considering both virtual simulation and physical parts.
    * [x] Create a preliminary circuit diagram and outline the basic program logic.
    * [x] Inventory check: Confirm availability of necessary physical components at home for future stages.
    * [x] Order missing parts
* **Simulated Prototype Construction (e.g., Tinkercad,Wokwi):**
    * [x] Build the complete circuit virtually based on the plan.
    * [x] Write and test the initial code for the virtual microcontroller.
    * [x] Simulate the core interactions (e.g., button press triggers a simulated output like an LED or vibration motor).
    * [ ] Debug and refine the simulation until basic functionality is achieved.

#### **Week 15 – Physical Build & Mobile App Communication**

* [x] Set up the **Arduino development environment** and select a suitable microcontroller board.
* [x] Physically connect a **tactile button** to the microcontroller and write code to read button presses reliably.
* [ ] Implement **haptic feedback** by connecting and controlling a vibration motor triggered by the button press.
* [x] Implement **basic serial logging** via the Arduino IDE to monitor button presses and system status.

* [x] Integrate **Bluetooth communication** (e.g., using an HC-05/HC-06 module or ESP32 built-in Bluetooth).
* [x] Program the device to send a **signal/message** via Bluetooth when the button is pressed.
* [x] Develop a basic mobile app (or use a Bluetooth serial terminal app) to **receive and display** the signal, confirming communication.


#### **Week 16 – Offline Functionality & Data Management**

* [x] Implement a **data buffering mechanism** on the device to store timestamped button presses when the Bluetooth connection is unavailable.
* [x] Program the device to automatically **transmit stored data** when the Bluetooth connection is re-established.
* [ ] Test **data integrity and transmission** reliability after periods of disconnection.
* [ ] Simulate **various user scenarios** (e.g., frequent presses while disconnected, long disconnection periods) to test system robustness and buffer limits.

#### **Week 17 – Evaluation and MVP Preparation**

* [ ] Thoroughly **document the code**, providing comments and explanations.
* [ ] Create clear **hardware schematics** (wiring diagrams).
* [ ] Compile detailed **test results**, including successes, failures, and bug fixes.
* [ ] Critically evaluate the prototype: Identify **strengths, weaknesses, and areas for improvement**.
* [ ] Sketch potential **design refinements** (hardware casing, component choices, user interface) for the Minimum Viable Product (MVP).
* [ ] Plan the next steps for developing the MVP based on the evaluation.
