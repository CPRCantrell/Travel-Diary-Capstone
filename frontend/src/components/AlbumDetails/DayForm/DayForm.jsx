import React, { useState, useEffect, useRef } from 'react';
import { SearchBox } from '@mapbox/search-js-react';
import axios from 'axios';

import DisplayPhotos from '../DisplayPhotos/DisplayPhotos'
import useGlobalVariables from '../../../hooks/useGlobalVariables';
import AddPhoto from '../AddPhoto/AddPhoto';


import './DayForm.scss'

const DayForm = ({ album, auth, setReload }) => {

    const [baseUrl] = useGlobalVariables()
    const [addDay, setAddDay] = useState(false);
    const [day, setDay] = useState();
    const [entry, setEntry] = useState();
    const [cityResult, setCityResult] = useState();

    const cityRef = useRef()

    useEffect(() => {
        if(album.days.length > 0){
            let tempDayHolder = album.days[album.days.length-1]
            if(!tempDayHolder.day_complete){
                setDay(tempDayHolder)
                setEntry(tempDayHolder.entry)
                setAddDay(true)
            }
        }
    },[]);

    useEffect(() => {
        updateEntry()
    }, [entry]);

    async function updateEntry(){
        try{
            let dayPackage = {entry:(entry === null? '':entry)}
            let response = await axios.put(baseUrl+'/day/'+day.id,dayPackage,auth)
            console.log(response.data)
        }
        catch{
            console.log('Issue updating entry')
        }
    }

    async function createDay(){
        try{
            let dayPackage = {album_id:album.id, day_on_trip:album.days.length + 1}
            let response = await axios.post(baseUrl+'/days',dayPackage,auth)
            setDay(response.data)
            setEntry(response.data.entry)
            setReload(true)
        }
        catch{
            console.log('Issue with submiting day')
        }
    }

    async function handleTripComplete(){
        try{
            let response = await axios.patch(baseUrl+'/album/'+album.id,{current_trip:false},auth)
            setReload(true)
        }
        catch{
            console.log('issue completing Album')
        }
    }

    async function handleCitySubmit(event){
        event.preventDefault()
        let country = !album.all_days_in_same_country? cityResult.features[0].properties.context.country.name : undefined
        let state = cityResult.features[0].properties.context.region ? cityResult.features[0].properties.context.region.name : undefined
        let city = cityResult.features[0].properties.name
        let dayPackage = {country:country,state:state,city:city}
        try{
            let response = await axios.put(baseUrl + '/day/' + day.id,dayPackage,auth)
            setDay(response.data)
        }
        catch{
            console.log('issue updating day location')
        }
    }

    async function handleComplete(){
        try{
            let response = await axios.patch(baseUrl+'/day/'+day.id,{day_complete:true},auth)
            setReload(true)
        }
        catch{
            console.log('Issye completing day')
        }
    }

    function deteterminLocationDisplay(){
        if(!album.all_days_in_same_city){
            return <h3>{day.state === null ? day.city: `${day.city}, ${day.state}`}</h3>
        }
        if(!album.all_days_in_same_country){
            return <h3>{`${day.state === null ? day.city: `${day.city}, ${day.state}`}, ${day.country}`}</h3>
        }
        return null
    }

    return (
        <div className='day-form'>
            {!addDay?
                <div className='form-options'>
                    <button onClick={()=>createDay()} className='submit'>+ Day</button>
                    <button onClick={()=>handleTripComplete()} className='submit'>Trip is Over</button>
                </div>
                :
                <div>
                    <h2>{'Day '+day.day_on_trip}</h2>
                    {day.city !== null ? deteterminLocationDisplay():null}
                    {day.id?<>
                        {!album.all_days_in_same_city && day.city === null?
                            <form className='city-form' onSubmit={(e)=>handleCitySubmit(e)}>
                                <div onClick={()=>cityRef.current.focus()} className='input-box mapbox-search'>
                                    <SearchBox ref={cityRef} theme={{variables:{boxShadow:'none'}, cssText: ".Input{color: var(--main-background);}"}} onRetrieve={(result)=>setCityResult(result)} value='' options={{types:'city', language:'en'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ'/>
                                    <span>Enter City</span>
                                    <i/>
                                </div>
                                <input type='submit' value='Submit City' />
                            </form>
                        :
                            <div className='today-entry'>
                                <div className='above-textarea'>
                                    <label>Today's Entry</label>
                                    <button onClick={()=>handleComplete()} className='submit'>Complete Day</button>
                                </div>
                                <textarea rows='3' name='entry' value={entry===null? '':entry} onInput={(e)=>setEntry(e.target.value)} />
                            </div>
                        }
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