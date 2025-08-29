# Never Alone - mobile app

A mobile app designed for women feeling unsafe and needing to appear not alone. The app provides the user with a simulated phone call to enhance a sense of security.


---



# Tech stack

- **Languages:** JavaScript
- **Libraries:** React Native
- **Testing:** React Native Testing Library, Jest

---
# Functions

- **Simulated Phone Call:** Triggers a fake incoming call to create a sense of safety.
- **Reporting Incidents:** Allows users to report safety concerns directly within the app.


---
# Getting Started

## Dependencies

- Node.js 
- npm

## Installations

```shell
git clone MobileApp
cd mobileapp
npm i
```
## Map structure
```md 
never-alone-app/
|──    assets
 ```

## a11y 
* Included proper labels for all interactive elements
* Announce important events for screen readers
* Ensure good color contrast and visible focus states

## Tests
Run test
````shell 
npm test
````

---

## Known problems
* Uncompleted unit tests
* Some screens and functions are missing, e.g., Notifications, Community, Friends screens
* The top part of the fake call button is invisible on androids
  
---

##  Future Work

- Complete all screens and unit tests
- extract code as a reusable component
- Improve accessibility further
  

