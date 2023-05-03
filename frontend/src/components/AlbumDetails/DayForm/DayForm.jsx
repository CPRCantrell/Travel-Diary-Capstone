import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DisplayPhotos from '../DisplayPhotos/DisplayPhotos'
import useGlobalVariables from '../../../hooks/useGlobalVariables';
import AddPhoto from '../AddPhoto/AddPhoto';


import './DayForm.scss'

const DayForm = ({ album, auth, setReload }) => {

    const [baseUrl] = useGlobalVariables()
    const [addDay, setAddDay] = useState(false);
    const [day, setDay] = useState();

    useEffect(() => {
        if(album.days.length > 0){
            let tempDayHolder = album.days[album.days.length-1]
            if(!tempDayHolder.day_complete){
                setDay(tempDayHolder)
                setAddDay(true)
            }
        }
    },[]);

    async function createDay(){
        try{
            let dayPackage = {album_id:album.id, day_on_trip:album.days.length + 1}
            let response = await axios.post(baseUrl+'/days',dayPackage,auth)
            setDay(response.data)
        }
        catch{
            console.log('Issue with submiting day')
        }
    }

    return (
        <div className='day-form'>
            {!addDay? <button onClick={()=>createDay()}>+ Day</button>:
                <div>
                    {day.id?<>
                            <div className='photo-area'>
                                <AddPhoto auth={auth} day={day} setReload={setReload}/>
                                <DisplayPhotos photos={day.photos} auth={auth}/>
                            </div>
                        </>:null}
                </div>
            }
        </div>
    );
}

export default DayForm;