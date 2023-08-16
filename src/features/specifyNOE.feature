Feature: Specify the number of events displayed on the screen
    Scenario: When user access the app, 32 events are displayed by default
        Given user has not opened the app
        When the user first opens the app
        Then there should be 32 events displayed

    Scenario: When user changes the number of events displayed, the number of events matches
        Given user has default 32 events displayed
        When the user changes number of events in the input
        Then the nubmer of events should change to match the number in the input 