Feature: Show hide an events detail
    Scenario: When user access the app, the details are collapsed by default
        Given user hasn’t opened any event details
        When the user opens the app
        Then the user should not be able to see the event details

    Scenario: User can expand an event to see the details
        Given user can see the list of events
        When the user clicks the show detail button
        Then the user should be able to expand an event to see the details

    Scenario: User can hide the event details
        Given user can see the expanded event with details
        When the user clicks hide detail button
        Then the user should be able to collapse and hide the event details 