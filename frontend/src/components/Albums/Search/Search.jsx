import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useGlobalVariables from '../../../hooks/useGlobalVariables';

import './Search.scss'

const Search = ({ setResults, auth }) => {

    const [search, setSearch] = useState('');
    const [albums, setAlbums] = useState([]);
    const [days, setDays] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [friends, setFriends] = useState([]);

    const [baseUrl] = useGlobalVariables()

    useEffect(() => {
        getAllAlbumInfo()
        getAllDayInfo()
        getAllPhotoInfo()
    }, []);

    useEffect(() => {
        if(search===''){setResults(undefined)}
        else{
            let albumResult = searchAlbums()
            let dayResult = searchDays()
            let photoResult = searchPhotos()
            let resultPackage = {albums:albumResult,days:dayResult,photos:photoResult}
            setResults(resultPackage)
        }
    }, [search]);

    async function getAllAlbumInfo(){
        try{
            let response = await axios.get(baseUrl+'/albums',auth)
            setAlbums(response.data)
        }
        catch{
            console.log('issue gathering album info')
        }
    }

    async function getAllDayInfo(){
        try{
            let response = await axios.get(baseUrl+'/days',auth)
            setDays(response.data)
        }
        catch{
            console.log('issue gathering days info')
        }
    }

    async function getAllPhotoInfo(){
        try{
            let response = await axios.get(baseUrl+'/photos',auth)
            setPhotos(response.data)
        }
        catch{
            console.log('issue gathering photos info')
        }
    }

    function searchAlbums(){
        return albums.filter(album=>{
            if(album.title.toLowerCase().includes(search)){return true}
            if(album.all_days_in_same_country){if(album.country.toLowerCase().includes(search)){return true}}
            if(album.all_days_in_same_city){if(album.city.toLowerCase().includes(search)){return true}}
            if(album.state !== null){if(album.state.toLowerCase().includes(search)){return true}}
            if(album.region !== null){if(album.region.toLowerCase().includes(search)){return true}}
            if(album.month.toLowerCase().includes(search)){return true}
            if(String(album.year).toLowerCase().includes(search)){return true}
            if(String(album.day).toLowerCase().includes(search)){return true}
            return 0
        })
    }
    function searchDays(){
        return days.filter(day=>{
            if(day.entry !== null){if(day.entry.toLowerCase().includes(search)){return true}}
            if(day.country !== null){if(day.country.toLowerCase().includes(search)){return true}}
            if(day.state !== null){if(day.state.toLowerCase().includes(search)){return true}}
            if(day.city !== null){if(day.city.toLowerCase().includes(search)){return true}}
            if(String(day.day_on_trip).toLowerCase().includes(search)){return true}
            return 0
        })
    }
    function searchPhotos(){
        return photos.filter(photo=>{
            if(photo.caption !== null){if(photo.caption.toLowerCase().includes(search)){return true}}
            return 0
        })
    }

    return (
        <form>
            <div className='input-box'>
                <input type='text' value={search} onInput={(e)=>setSearch(e.target.value.toLowerCase())}/>
                <span>Search</span>
                <i/>
            </div>
        </form>
    );
}

export default Search;