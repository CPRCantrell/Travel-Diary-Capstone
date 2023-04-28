import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from '@mapbox/search-js-react';
import axios from 'axios';

import useAuth from '../../../hooks/useAuth';
import Collapsible from '../../elements/Collapsible/Collapsible'

import './RequiredAlbumInfo.scss'

const RequiredAlbumIndo = () => {

    const [user, token] = useAuth()
    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [privacy, setPrivacy] = useState(false);
    const [start, setStart] = useState('');
    const [infoNeeded, setInfoNeeded] = useState('');
    const [city, setCity] = useState(true);
    const [cityResult, setCityResult] = useState([]);
    const [country, setCountry] = useState(true);
    const [countryResult, setCountryResult] = useState([]);
    const [continent, setContinent] = useState('');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    useEffect(() => {
        if(city){
            setInfoNeeded('city')
            setCountry(true)
        }
        else if(country){
            setInfoNeeded('country')
        }
        else{
            setInfoNeeded('')
        }
    }, [city, country]);

    function getLogLat(){
        let log, lat;
        if(city){
            [log, lat] = cityResult.features[0].geometry.coordinates
        }
        else if(country){
            [log, lat] = countryResult.features[0].geometry.coordinates
        }
        return [log, lat]
    }

    function formatDate(){
        let date = start.split('-')
        for(let str in date){
            date[str] = parseInt(date[str])
        }
        date[1] = months[date[1]-1]
        return date
    }

    function handleSubmit(event){
        event.preventDefault()
        let date = formatDate()
        let [longitude, latitude] = getLogLat()
        let submitCountry = country? (city? cityResult.features[0].properties.context.country.name : countryResult.features[0].properties.name) : undefined
        let submitCity = city? cityResult.features[0].properties.name : undefined
        let albumInfo={
            title: title,
            latitude: latitude,
            longitude: longitude,
            continent: continent,
            all_days_in_same_country: country,
            country: submitCountry,
            all_days_in_same_city: city,
            city: submitCity,
            year: date[0],
            month: date[1],
            day: date[2],
            private: privacy
        }
        debugger
        console.log(albumInfo)
        debugger
        sendAlbumData(albumInfo)
    }

    async function sendAlbumData(albumInfo){
        try{
            let response = axios.post('http://127.0.0.1:5000/api/albums',albumInfo,{
            headers:{
                Authorization: 'Bearer ' + token,
            }})
            navigate('/home')
        }
        catch{
            console.log('error in album submition')
        }
    }

    return (
        <form className='req-album-info' onSubmit={(e)=>handleSubmit(e)}>

            <div className='info-group'>
                <label>Album Name</label>
                <input type='text' name='title' placeholder='Name this album' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>

            <div className='info-group'>
                <label>Set Private</label>
                <input type='checkbox' checked={privacy} onChange={()=>setPrivacy(!privacy)}/>
            </div>

            <div className='info-group'>
                <label>Start</label>
                <input type='date' onChange={(e)=>setStart(e.target.value)}/>
            </div>

            <div className='info-group'>
                <label>Entire Trip is in the same City</label>
                <input type='checkbox' checked={city} onChange={()=>setCity(!city)}/>
            </div>
            <Collapsible show={infoNeeded === 'city'} >
                <SearchBox onRetrieve={(result)=>setCityResult(result)} value=' ' options={{types:'city'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ' />
            </Collapsible>

            <div className='info-group'>
                <label>Entire Trip is in the same Country</label>
                <input type='checkbox' checked={country} onChange={()=>setCountry(!country)}/>
            </div>
            <Collapsible show={infoNeeded === 'country'} >
                <SearchBox onRetrieve={(result)=>setCountryResult(result)} value=' ' options={{types:'country'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ' />
            </Collapsible>

            <div className='info-group'>
                <label>What continent</label>
                <input type='text' placeholder='Europe' value={continent} onChange={(e)=>setContinent(e.target.value)}/>
            </div>

            <input type='submit' value='Set Album' />
        </form>
    );
}

export default RequiredAlbumIndo;