// src/components/NumberOfEvents.js
import { useState } from "react";

const NumberOfEvents = ({setCurrentNOE, setErrorAlert}) => {
    const [eventNumber, setEventNumber] = useState(32);

    const handleInputChanged = (event) => {
        const value = parseInt(event.target.value);   // convert the input value to a number 
        setEventNumber(value);
        setCurrentNOE(value);

        if(isNaN(value)){
            setErrorAlert('Value is not a number')
        }else if (value <= 0) {
            setErrorAlert('Please input a valid number greater than 0')
        }else {
            setErrorAlert('');
            setCurrentNOE(value);
        }
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