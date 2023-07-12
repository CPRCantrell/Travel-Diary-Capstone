import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from '@mapbox/search-js-react';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';
import Collapsible from '../elements/Collapsible/Collapsible'
import SwitchInput from '../elements/SwitchInput/SwitchInput';
import useGlobalVariables from '../../hooks/useGlobalVariables';

import './NewTripForm.scss'

const NewTripForm = ({setModal}) => {

    const [user, token] = useAuth()
    const [BASE_URL, auth] = useGlobalVariables()
    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [privacy, setPrivacy] = useState(false);
    const [start, setStart] = useState('');
    const [infoNeeded, setInfoNeeded] = useState('');
    const [city, setCity] = useState(true);
    const [cityResult, setCityResult] = useState([]);
    const [country, setCountry] = useState(true);
    const [countryResult, setCountryResult] = useState([]);
    const [region, setRegion] = useState('');

    const cityRef = useRef()
    const countryRef = useRef()

    const regionLogLat = {
        'Africa':[-19,19],
        'Asia':[88,12],
        'Asia-Pacific':[128,25],
        'Australia':[111,-27],
        'Caribbean':[-62,18],
        'Central America':[-93,19],
        'Europe':[-7,45],
        'Middle East':[29,33],
        'North America':[-127,40],
        'South America':[-32,-8],
        'South Asia':[133,1],
        'Sub-Sahara':[43,-7]
    }
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
        }else{
            [log, lat] = regionLogLat[region]
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
        debugger
        let [longitude, latitude] = getLogLat()
        let info = city? cityResult.features[0].properties : country? countryResult.features[0].properties : false
        let submitCountry = info !== false? (city? (info.context.country? info.context.country.name : undefined) : info.name) : undefined
        let submitCity = city? info.name : undefined
        let state = city && info.context.region ? info.context.region.name : undefined
        let submitRegion = !(city && country)? region : undefined
        let albumInfo={
            title: title,
            latitude: latitude,
            longitude: longitude,
            region: submitRegion,
            all_days_in_same_country: country,
            country: submitCountry,
            all_days_in_same_city: city,
            city: submitCity,
            state: state,
            year: date[0],
            month: date[1],
            day: date[2],
            private: privacy
        }
        console.log(albumInfo)
        sendAlbumData(albumInfo)
    }

    async function sendAlbumData(albumInfo){
        try{
            let response = await axios.post(BASE_URL+'/albums',albumInfo,auth)
            navigate(`/album-detail/${response.data.id}`)
            setModal(false)
        }
        catch{
            console.log('error in album submition')
        }
    }

    return (
        <form className='trip-info' onSubmit={(e)=>handleSubmit(e)}>

            <div className='input-box'>
                <input required type='text' name='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <span>Album Name</span>
                <i/>
            </div>

            <div className='input-box'>
                <input className='date' required onChange={(e)=>setStart(e.target.value)} type='text' onFocus={(e)=>e.target.type='date'} onBlur={(e)=>!e.target.value? e.target.type='text':null} />
                <span>Start Date</span>
                <i/>
            </div>

            <div className='info-group d-flex private'>
                <label>Set Private</label>
                <SwitchInput checked={privacy} onChange={()=>setPrivacy(!privacy)}/>
            </div>

            <div className='span-across location'>
                <div>
                    <div className='info-group d-flex'>
                        <label>Entire Trip will be in the same <span>City</span></label>
                        <SwitchInput type='checkbox' checked={city} onChange={()=>setCity(!city)}/>
                    </div>
                    <Collapsible show={infoNeeded === 'city'} >
                        <div onClick={()=>cityRef.current.focus()} className='input-box mapbox-search'>
                            <SearchBox ref={cityRef} theme={{variables:{boxShadow:'none'}, cssText: ".Input{color: var(--main-background);}"}} onRetrieve={(result)=>setCityResult(result)} value='' options={{types:'city', language:'en'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ'/>
                            <span>Enter City</span>
                            <i/>
                        </div>
                    </Collapsible>
                </div>

                <div>
                    <Collapsible show={infoNeeded !== 'city'}>
                        <div className='info-group d-flex'>
                            <label>Entire trip will be in the same <span>Country</span></label>
                            <SwitchInput type='checkbox' checked={country} onChange={()=>setCountry(!country)}/>
                        </div>
                    </Collapsible>
                    <Collapsible show={infoNeeded === 'country'} >
                        <div onClick={()=>countryRef.current.focus()} className='input-box mapbox-search'>
                            <SearchBox ref={countryRef} theme={{variables:{boxShadow:'none'}, cssText: ".Input{color: var(--main-background);}"}} onRetrieve={(result)=>setCountryResult(result)} value='' options={{types:'country', language:'en'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ'/>
                            <span>Enter Country</span>
                            <i/>
                        </div>
                    </Collapsible>
                </div>

                <Collapsible show={infoNeeded===''}>
                    <div className='input-box'>
                        <select type='text' placeholder='Europe' value={region} onChange={(e)=>setRegion(e.target.value)}>
                            <option value=''></option>
                            <option value='Africa'>Africa</option>
                            <option value='Asia'>Asia</option>
                            <option value='Asia-Pacific'>Asia-Pacific</option>
                            <option value='Australia'>Australia</option>
                            <option value='Caribbean'>Caribbean</option>
                            <option value='Central America'>Central America</option>
                            <option value='Europe'>Europe</option>
                            <option value='Middle East'>Middle East</option>
                            <option value='North America'>North America</option>
                            <option value='South America'>South America</option>
                            <option value='South Asia'>South Asia</option>
                            <option value='Sub-Sahara'>Sub-Sahara</option>
                        </select>
                        <span>select Region / Continent</span>
                        <i/>
                    </div>
                </Collapsible>

            </div>

            <input type='submit' value='Create Album' className='span-across'/>
        </form>
    );
}

export default NewTripForm;