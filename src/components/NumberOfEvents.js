// src/components/NumberOfEvents.js
import { useState } from "react";

const NumberOfEvents = ({setCurrentNOE}) => {
    const [eventNumber, setEventNumber] = useState(32);

    const handleInputChanged = (event) => {
        const value = parseInt(event.target.value);   // convert the input value to a number 
        setEventNumber(value);
        setCurrentNOE(value);
    }
    
    return(
        <div id='number-of-events'>
            <input
            type="number"
            className="number-of-events"
            value={eventNumber}
            onChange={handleInputChanged}
            aria-label="number-of-events"
            >
            </input>
        </div>
    )
};

export default NumberOfEvents;