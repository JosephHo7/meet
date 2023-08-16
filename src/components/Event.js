// src/components/Event.js
import { useState } from "react";

const Event = ({event}) => {
    const [showDetails, setShowDetails] = useState(false);

    return( 
        <li className='event'>
            <div>
                {/* event title  */}
                <h1>{event.summary}</h1>
                <div>{event.location}</div>
                <div>{event.created}</div>
                {showDetails && <div className='details' data-testid='details' >{event.description}</div>}
                <button className='detail-button' onClick={() => setShowDetails(!showDetails)}>
                    {showDetails? "hide details": "show details"} 
                </button>
            </div>
        </li>
    );
};

export default Event;