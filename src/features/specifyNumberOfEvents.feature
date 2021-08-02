Feature: Specify number of events

Scenario: When a user hasn’t specified a number, 32 is the default number.
Given the user did not specify the number of events they want to see
And the event list has been loaded
When the application displays the list of events
Then the user should see a list with a maximum 32 events

Scenario: User can change the number of events they want to see.
Given the user wants to change the number of events they see
When the user enters or selects a number of events to be shown
Then the list will update displaying the number of events the user specified