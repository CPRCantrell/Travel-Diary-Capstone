import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useGlobalVariables from '../../../hooks/useGlobalVariables';

import './Map.scss'

const Map = () => {

    const [markerLocations, setMarkerLocations] = useState('');
    const [loading, setLoading] = useState(true);
    const [baseURL, auth] = useGlobalVariables()

    useEffect(() => {
        getLogLat()
    }, []);

    async function getLogLat(){
        try{
            let response = await axios.get(baseURL+'/albums', auth)
            let data = response.data.map(album=>[album.longitude, album.latitude])
            if (data.length > 0){
                setMarkers(data)
            }else{
                setLoading(false)
            }
        }
        catch{
            console.log('Issue getting album lat and log')
        }
    }

    function setMarkers(coords){
        let tempML = ''
        let format = coords.length - 1
        coords.forEach((coord, index) => {
            tempML += `pin-s+45f3ff(${coord[0]},${coord[1]})`
            if(index === format){
                tempML += '/'
            }else{
                tempML +=','
            }
        })
        setMarkerLocations(tempML)
        setLoading(false)
    }

    return (
        <div className='map'>
            {!loading ? <img src={`https://api.mapbox.com/styles/v1/c-romancantrell/clgy1hm6200lh01qm9php09yv/static/${markerLocations}11,20,1.3,0/1260x660@2x?access_token=pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ`} alt="world map" /> :null}
        </div>
    );
}

export default Map;