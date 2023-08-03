// src/components/Event.js
import { useEffect, useState } from "react";

const Event = ({event}) => {
    const [showDetails, setShowDetails] = useState(false);

    return( 
        <li>
            <div>
                {/* event title  */}
                <h1>{event.summary}</h1>
                <div>{event.location}</div>
                <div>{event.created}</div>
                {showDetails && <div>{event.description}</div>}
                <button className='detail-button' onClick={() => setShowDetails(!showDetails)}>
                   {showDetails? "hide details": "show details"}
                </button>
            </div>
        </li>
    );
};

export default Event;