import React, { useState } from 'react';

import DisplayPhotos from './DisplayPhotos/DisplayPhotos';
import Collapsible from '../../elements/Collapsible/Collapsible'
import DayForm from './DayForm/DayForm';

import './DisplayDays.scss'

const DisplayDays = ({ days, setLoading, auth }) => {

    const [addDay, setAddDay] = useState(false);

    return (
        <div className='days'>
            {days.map((day, index) => {
                return(
                    <div key={index} className='day'>
                        <h2>{`Day ${day.day_on_trip}`}</h2>
                        <p>{day.city}</p>
                        <div>
                            <DisplayPhotos photos={day.photos} />
                        </div>
                        <div>
                            <h3>Your Day Entry</h3>
                            <p>{day.entry}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default DisplayDays;