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
![Diagram](https://raw.githubusercontent.com/ChasChallangeIII/NeverAlone/main/nerveralone.drawio.svg) 

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
The objective of this project is to develop a comprehensive admin panel that facilitates secure access for administrators to log in and access all collected data. This mobile application will implement a robust role-based permission system, ensuring that administrators can view and manage the data to which they have been granted access.

To enhance data accessibility and usability, we will also create a dedicated website that provides administrators with an alternative method of viewing this data. This platform will offer a more detailed presentation of the information, featuring various diagrams and metrics that will aid in data analysis and decision-making.

### Secure Login System
- Implement a secure authentication mechanism for administrators to log in safely.

### Role-Based Access Control
- Establish a role-based permission framework that allows for differentiated access levels.  
- Enable administrators to view only the data they are authorized to access.

### Comprehensive Data Visualization
- Develop a user-friendly website that presents data in a visually appealing manner.  
- Utilize diverse diagrams and metrics to provide insights and facilitate in-depth analysis.

### Enhanced Data Management
- Equip administrators with tools to efficiently manage the collected data.  
- Ensure that administrators can extract meaningful information to inform their decisions.

### **Conclusion of Admin Panel**

By implementing these features, we aim to create an effective admin panel and accompanying website that not only ensures secure access to data but also enhances the ability of administrators to analyze and utilize this information effectively.

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
- **First Prototype:** Week 17 (See [MVP.md](https://github.com/ChasChallangeIII/NeverAlone/edit/main/Prototype.md))
- **MVP:** Week 21 (See [Prototype.md](https://github.com/ChasChallangeIII/NeverAlone/edit/main/MVP.md))
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

#### **Whole Team**  
As a team, we will conduct **preliminary research** not only for frontend design but also for backend and IoT aspects. This includes:  
- Studying security concerns and user behavior to understand risks and solutions.  
- Reviewing existing security apps and safety data collection methods.  
- Investigating technologies and APIs that can improve security app functionality.  
- Ensuring that both technical implementation and user experience align with our core mission.  

#### **Frontend**  
- User persona creation, Figma design, and UI/UX research.
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
