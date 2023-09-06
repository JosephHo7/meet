import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert } from './components/Alert';
import { ErrorAlert } from './components/Alert';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');

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
      <div className='alerts-container'> 
        {infoAlert.length ? <InfoAlert text ={infoAlert}/>:null}
        {errorAlert.length ? <ErrorAlert text ={errorAlert}/>:null}
      </div>
      <CitySearch 
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}/>
      <EventList events={events}/>
      <NumberOfEvents 
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}/>
    </div>
  );
}

export default App;