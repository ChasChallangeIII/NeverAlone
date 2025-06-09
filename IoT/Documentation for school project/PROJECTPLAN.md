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
 * [x] Debug and refine the simulation until basic functionality is achieved.

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

* [x] Thoroughly **document the code**, providing comments and explanations.
* [ ] Create clear **hardware schematics** (wiring diagrams).
* [ ] Compile detailed **test results**, including successes, failures, and bug fixes.
* [ ] Critically evaluate the prototype: Identify **strengths, weaknesses, and areas for improvement**.
* [ ] Sketch potential **design refinements** (hardware casing, component choices, user interface) for the Minimum Viable Product (MVP).
* [ ] Plan the next steps for developing the MVP based on the evaluation.

#### **Week 17-18**
* [x] Improve **button press recognition**
* [ ] Implement **Bluetooth signal improvements**

#### **Week 19-20**
* [x] Finalize **ESP32 Bluetooth communication** with the mobile app
* [x] Coordinate with frontend team to ensure **message reception** from the ESP32
* [x] Format button press messages for easy parsing (e.g., "BTN_PRESS")
* [x] Begin implementing **mobile-side timestamp and geolocation capture**
* [x] Verify real-time data logging via mobile debugging tools

#### **Week 21**
* [x] Implement **GPS and system time retrieval** on the mobile app
* [x] Store **button press events with timestamp and geolocation**
* [x] Test basic offline behavior (e.g., delayed connection or data queuing)
* [x] Refine UI to display event logs or confirmation of receipt

#### **Week 22**

* [x] Perform **end-to-end integration testing**
* [x] Fix bugs in **Bluetooth communication**, **data logging**, or **UI**
* [x] Prepare **presentation materials** and **demo walkthrough**
* [x] Create a **backup demo (video or screenshots)** in case of live issues

#### **Week 23 (Demo Week)**  
* [x] Demo the system: button press → Bluetooth signal → mobile log with time and location  
* [x] Highlight **technical achievements**, **challenges**, and **future plans**  
* [x] Emphasize design pivot to **breadboard prototype** due to hardware delay  
* [x] Showcase potential **MVP directions** for post-demo development

### Future Plans
* [x] Add haptic feedback for discreet tactile confirmation on button press.
* [x] Support basic offline behavior like delayed reconnection or data queuing.
* [x] Ensure BLE compatibility with iOS (CoreBluetooth compliant).
* [x] Optimize power consumption using ESP32’s deep sleep mode.
* [x] Miniaturize hardware with a custom PCB and integrated circuit.
* [x] Implement encrypted BLE communication for secure data transfer.
* [x] Support multi-press input (e.g., long press, double tap) for additional actions eg. calling the police directly or sharing location with Never Alone - community.
* [x] Enable firmware-over-the-air (OTA) updates via BLE or Wi-Fi.
* [x] Add battery monitoring and status reporting to the mobile app.
* [x] Design a water-resistant or rugged enclosure for outdoor use.



