import React from 'react';

import DisplayPhotos from '../DisplayPhotos/DisplayPhotos';

import './DisplayDays.scss'

const DisplayDays = ({ album, days }) => {

    function deteterminLocationDisplay(day){
        if(!album.all_days_in_same_city){
            return <h3>{day.state === null ? day.city: `${day.city}, ${day.state}`}</h3>
        }
        if(!album.all_days_in_same_country){
            return <h3>{`${day.state === null ? day.city: `${day.city}, ${day.state}`}, ${day.country}`}</h3>
        }
        return null
    }

    return (
        <div className='days'>
            {days.map((day, index) => {
                if(day.day_complete){
                    return(
                        <div key={index} className='day'>
                            <h2>{`Day ${day.day_on_trip}`}</h2>
                            {deteterminLocationDisplay(day)}
                            <div>
                                <DisplayPhotos photos={day.photos} />
                            </div>
                            <div>
                                <h3>Your Day Entry</h3>
                                <p>{day.entry}</p>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    );
}

export default DisplayDays;