import React, { useState } from 'react';

import DisplayPhotos from '../DisplayPhotos/DisplayPhotos';

import './DisplayDays.scss'

const DisplayDays = ({ days }) => {
    return (
        <div className='days'>
            {days.map((day, index) => {
                if(day.day_complete){
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
                }
            })}
        </div>
    );
}

export default DisplayDays;