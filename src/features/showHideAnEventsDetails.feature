Feature: Show/Hide an events details

Scenario: An event element is collapsed by default.
Given the list of events has been loaded
When the user does not perform any action
Then  the event element should be collapsed

Scenario: User can expand an event to see its details.
Given the list of elements has been loaded
When user opens the event element
Then the event element should expand to show the event details

Scenario: User can collapse an event to hide its details.
Given the user has opened the event element
When user selects hide details button for the event
Then the event element will collapse to hide the event details