# Project Plan (Never Alone)

## Introduction and Background  

### Brief Description of the Project's Purpose and Goals  
Never Alone is a security app that records the user's location and time when they feel unsafe. The app maps high-risk areas and provides users with alternatives such as security guard contact numbers or fake calls.  

### Description of the Problem the Solution Addresses  
The app aims to map potential risk zones for the general population. Municipalities will provide data and supporting information for further safety measures.  

### Potential Stakeholders and Target Groups  
- **Municipalities:** Can use the data to identify unsafe areas and make decisions regarding urban planning and safety measures.  
- **Security Companies:** Can use real-time data to optimize their operations and provide better services to customers.  
- **Property Owners and Housing Companies:** Can assess the safety perception in and around their properties and take action to improve tenant well-being and security.  
- **Transportation Companies:** Can gain insights into safety at public transport stations and stops.  

## Technology and Architecture Choices  

### Choice of Technologies for Frontend, Backend, and IoT  
- **IoT:** C++  
- **Frontend:** Figma, React Native  
- **Backend:** JavaScript, Node.js, Express, and PostgreSQL  

### Overview of System Architecture  
*(Diagram to be included showing how frontend, backend, and IoT components interact.)*  

### Decisions on Database and API Structure  
- **Backend:** Node.js (Express.js) and PostgreSQL  

## Team Structure and Responsibilities  

All project members are collectively responsible for ensuring the delivery of a high-quality final product. The team is divided into three groups: **Frontend, Backend, and IoT.** (**See GroupContract.md for further information**) However, cross-functional collaboration will occur when necessary.  

### **FWMX (Frontend Team: Neriman Abduljalel)**  
# Project Tasks  

## Preliminary Study and Design  
- Conduct a preliminary study, create user personas, get inspired by websites and apps, and start sketching in Figma.  

## User Authentication and Profile Management  
- Implement login, logout, and account creation features.  
- **Settings:** Define necessary user settings.  
- **Profile:** Allow users to manage their profile.  
- **Add Contacts:** Enable users to add emergency contacts.  

## Mobile Application Functionality  
- The mobile application should simulate a **fake call** when the user presses the wearable button or a button within the app.  
- This action should trigger the system to send **time and location data** to the server.  

## Recording Feature  
- Implement a **recording function** that starts both when:  
  - A button is pressed in the app.  
  - The wearable button is activated.  

## Notification System  
- **Survey Notification:**  
  - Users receive a notification after a set time, prompting them to answer follow-up questions about the incident.  
  - This helps gain deeper insights into what caused their feeling of insecurity, allowing for more detailed data analysis for business clients (B2B).  
- **Safety Alert Notification:**  
  - Users receive notifications when one of their contacts is in danger, including **their location**.  

## Admin Panel  
- Develop an **admin panel** that allows administrators to log in and view all collected data.  

## Documentation  
- Documentation will be created continuously throughout the project.  
- It should describe different components of the mobile application, ensuring a **clear development process** and an **overview of its functionalities**.  
 

### **FJSX (Backend Team: Tobias Engvall, Oscar Burman & Robin Andersson)**  
- Receive and store user-reported data (date, time, location).  
- Aggregate and present stored data in a simple format.  
- Implement secure authentication with user and admin access levels.  
- Determine whether to launch the API and database live for app-server communication.  

### **SUVX (IoT Team: Markus Reutervik, Jacob Hakimi, David Reyes, Mario Doka & Fredrik Rappich (Mårtensson))**  
- Select hardware and develop a compact, responsive button that:  
  - Sends wireless signals to the mobile app.  
  - Provides immediate haptic feedback.  

## Work Methodology and Tools  

### **Agile Methodology**  
- **Scrum** with weekly sprints, meetings on Tuesdays at 09:00.  

### **Project Tracking**  
- **GitHub Projects** for task management.  

### **Tools Used**  
- **Code Management:** GitHub  
- **Communication:** Discord  
- **Sprint Planning and Task Management:** GitHub  
- **Code Review Process:** Pull requests must be reviewed and approved before merging.  

## Timeline and Milestones  

We will use **GitHub Projects** to define different sprint goals.  

### **Expected Completion Dates:**  
- **First MVP:** Week 17  
- **Implementation of Core Features:** Included in MVP  
- **Testing & Optimization:** Ongoing, with standups every Tuesday at 09:00  

## Risk Analysis and Problem Management Plan  

### **Potential Risks:**  
- Technical challenges  
- Communication breakdowns  
- Time constraints  

We recognize that problems will arise, especially in terms of time constraints. Our **agile approach** ensures adaptability and problem-solving as issues arise. If necessary, we will **scale down ambitions** to maintain steady progress.  

### **Handling Development Blockers:**  
1. Team discussion to identify the cause and find a solution.  
2. If unresolved, adjust the project scope by removing problematic features.  

### **Addressing Team Member Performance Issues:**  
- Discuss within the team to provide support.  
- If workload is too high, redistribute tasks.  
- If lack of motivation is the issue, take appropriate actions, including possible removal from the project.  

## Deliverables and Documentation  

### **At Project Completion, the Following Must be Fully Implemented and Functional:**  
- A fully working system as per the specifications.  
- All core features implemented and tested.  
- System stability under expected load.  
- Completed user and technical documentation.  

### **Team Deliverables**  

#### **Frontend**  
- Preliminary research, user persona creation, and Figma design.  
- Fake call simulation for unsafe situations.  
- Survey feature to collect more detailed safety incident data.  
- Admin panel for viewing aggregated data.  
- Continuous documentation updates.  

#### **Backend**  
- Ability to send, receive, and store data from frontend.  
- Structuring data for easy retrieval and transmission.  
- Potential live deployment of API and database.  
- Continuous documentation of API usage and system architecture.  
- Secure authentication for admin users.  

#### **IoT**  
- Wearable button capable of sending Bluetooth signals to the mobile app.  
- Haptic feedback and local storage of button presses when offline.  
- Low-power consumption for extended battery life.  
- Compact, portable design.  
- Backend communication implementation.  

### **Documentation**  
- **TDS (Technical Design Specification) document**  
- **User instructions**  

#### **Documentation Updates**  
- Updated continuously with every significant code change.  
- Included in the pull request review process.  
- Scheduled reviews every Tuesday to ensure accuracy and completeness.  
