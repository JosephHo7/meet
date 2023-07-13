# meet
Filter events by city. <br>
As a user,
I should be able to filter events by city
So that I can see a list of events taking place in that city.
When user hasn’t searched for a specific city, show upcoming events from all cities.
Given user hasn’t searched for any city;
When the user opens the app;
Then the user should see a list of upcoming events.
Show/Hide Event Details. 
As a user, I should be able to show/hide event details so that I can get more information about certain events	
Given user hasn’t opened any event details, When the user clicks show details, Then the user should be able to learn more about the event
Specify Number of Events.
As a user, I should be able to specify the number of events I can see so that I can easily view and scroll through the list of events
Given user has searched for a specific city AND a list of events has been returned, When the user filters the number of events on the page, Then the user should be allowed to view a certain number of events at a time
Use the App When Offline. 
As a user, I should be able to use the app when offline so that it is convenient for me to access events I was interested in when I was last online as well
Given the user has previously searched for an event on the app AND the user is no longer online, When the user accesses the app, Then the user should be able to see recent search results
Add an App Shortcut to the Home Screen. 
As a user, I should be able to add an app shortcut to the home screen so that I am able to access the app faster
Given the user has downloaded the app, When the user clicks on a shortcut link, Then the user should be able to access the app directly
Display Charts Visualizing Event Details.
As a user, I should be able to view display charts visualizing event details so that I can easily see event details and compare what events are happening in which cities
Given the user has searched for events, When the user clicks on a button to display charts, Then they should be able to see a chart displaying upcoming events in each city
