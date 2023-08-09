import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === 'See all cities' ?
      allEvents: 
      allEvents.filter(event => event.location === currentCity);

      const slicedEvents = filteredEvents.slice(0, currentNOE);
      setEvents(slicedEvents);
      setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchData();
  },[currentCity, currentNOE]);

  return(
    <div className='App'>
      <CitySearch allLocations={allLocations}
      setCurrentCity={setCurrentCity}/>
      <EventList events={events}/>
      <NumberOfEvents setCurrentNOE={setCurrentNOE}/>
    </div>
  );
}

export default App;