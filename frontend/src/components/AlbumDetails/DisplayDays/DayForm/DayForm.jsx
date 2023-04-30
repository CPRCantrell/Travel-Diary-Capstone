import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DragDropInut from '../../../elements/DragDropInput/DragDropInput'

import './DayForm.scss'

const DayForm = ({ auth, album }) => {

    const [dayCount, setDayCount] = useState(album.days.length);

    useEffect(() => {
        addDay()
    }, []);

    async function addDay(){
        try{

        }
        catch{

        }
    }

    return (
        <form className='day-form'>
            <h2>{`Day ${dayCount}`}</h2>
        </form>
    );
}

export default DayForm;