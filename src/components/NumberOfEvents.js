// src/components/NumberOfEvents.js
import { useState } from "react";

const NumberOfEvents = () => {
    const [eventNumber, setEventNumber] = useState(32);

    const handleInputChanged = (event) => {
        const value = parseInt(event.target.value);   // convert the input value to a number 
        setEventNumber(value);
    }
    
    return(
        <div id='number-of-events'>
            <input
            type="number"
            className="number-of-events"
            value={eventNumber}
            onChange={handleInputChanged}
            >
            </input>
        </div>
    )
};

export default NumberOfEvents;