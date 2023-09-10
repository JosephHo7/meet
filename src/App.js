import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert, WarningAlert } from './components/Alert';
import { ErrorAlert } from './components/Alert';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');

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
    if(navigator.onLine) {
      setWarningAlert('');
    }else {
      setWarningAlert('The display list has been loaded from the cache');
    };
    fetchData();
  },[currentCity, currentNOE]);

  return(
    <div className='App'>
      <div className='alerts-container'> 
        {infoAlert.length ? <InfoAlert text ={infoAlert}/>:null}
        {errorAlert.length ? <ErrorAlert text ={errorAlert}/>:null}
        {warningAlert.length ? <WarningAlert text={warningAlert}/>:null}
      </div>
      <CitySearch 
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}/>
      <div className='charts-container'>
        <CityEventsChart
          allLocations={allLocations}
          events={events}/>
      </div>
      <EventList events={events}/>
      <NumberOfEvents 
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}/>
    </div>
  );
}

export default App;