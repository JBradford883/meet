# **Task 4.1: Test Driven Development & Test Scenarios**

## **Objective**
To build a serverless, progressive web application (PWA) with React using a test-driven
development (TDD) technique. The application uses the Google Calendar API to fetch
upcoming events.

---

## **Key Features**

- Filter events by city.
- Show/hide event details.
- Specify number of events.
- Use the app when offline.
- Add an app shortcut to the home screen.
- View a chart showing the number of upcoming events by city.

---

## **User Stories and Scenarios**


### **Feature 1: Filter events by city** 
As a user,  
I should be able to “filter event by city”  
So that I can see the list of events that take place in that city.

**Scenario 1:**  When a user hasn’t searched for a city, show upcoming events from all cities.  
**Given** user hasn’t searched for any city  
**When** the user opens the app  
**Then** the user should see a list of all upcoming events

**Scenario 2:**  User should see a list of suggestions when they search for a city.  
**Given** the main page is open  
**When** user starts typing in the city text box  
**Then** the user should see a list of cities (suggestions) that match what they’ve typed

**Scenario 3:**  User can select a city from the suggested list.
**Given** the user was typing “Berlin” in the city text box  
And the list of suggested cities is showing  
**When** the user selects a city (e.g., “Berlin, Germany”) from the list  
**Then** their city should be changed to that city (i.e., “Berlin, Germany”)And the user should receive a list of upcoming events in that city

---

### **Feature 2: Show/Hide an events details**

As a user,  
I should be able to show/hide event details  
So that I can choose to see more/less information about an event.

**Scenario 1:** An event element is collapsed by default
Given the list of events has been loaded
When the user does not perform any action
Then  the event element should be collapsed

**Scenario 2:** User can expand an event to see its details
Given the list of elements has been loaded
When user opens the event element
Then the event element should expand to show the event details

**Scenario 3:** User can collapse an event to hide its details
Given the user has opened the event element
When user selects hide details button for the event
Then the event element will collapse to hide the event details

---

### **Feature 3: Specify number of events**

As a user,  
I should be able to specify the number of events shown  
So that I can choose to see more/less events at one time

**Scenario 1:** When a user hasn’t specified a number, 32 is the default number  
**Given** the user did not specify the number of events they want to see  
**When** the application displays the list of events    
**Then** the user should be a list with a maximum 32 events  

**Scenario 2:** User can change the number of events they want to see  
**Given** the user wants to change the number of events they see  
**When** the user enters or selects a number of events to be shown  
**Then** the list will update displaying the number of events the user specified  

---

### **Feature 4:** Use the app when offline

As a user,  
I should be able to use the app while being offline  
So that I can see the events I viewed the last time I was online

**Scenario 1:** Show cached data when there’s no internet connection   
**Given** the user does not have internet connection    
**When** the user opened the application    
**Then** the application should display the cached data from a previous visit

**Scenario 2:** Show error when user changes the settings (city, time range)  
**Given** the user does not have internet connection while accessing the app  
**When** the user attempts to change the city, time range  
**Then** the application will show an error message

_____________________________________________________________________________________________


### **Feature 5: Data visualization**

As a user,  
I should be able to see a chart of the upcoming events in each city  
So that I know what events are coming up in each city

**Scenario 1:** Show a chart with the number of upcoming events in each city  
**Given** the list of events has been loaded  
**When** the users selects a specific city  
**Then** the user can see a chart of the events upcoming in the selected city.  

