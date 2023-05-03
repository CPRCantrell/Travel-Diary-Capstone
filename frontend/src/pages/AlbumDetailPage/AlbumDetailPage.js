import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';
import DisplayAlbum from '../../components/AlbumDetails/DisplayAlbum/DisplayAlbum';
import DisplayDays from '../../components/AlbumDetails/DisplayDays/DisplayDays';
import DayForm from '../../components/AlbumDetails/DayForm/DayForm';

import './AlbumDetailPage.scss'

const AlbumDetailPage = () => {

    const { albumId } = useParams()
    const [user, token] = useAuth()
    const auth = {headers:{Authorization: 'Bearer ' + token}}

    const [loading, setLoading] = useState(true);
    const [currentTrip, setcurrentTrip] = useState(false);
    const album = useRef([]);
    const days = useRef([]);
    const photos = useRef([]);
    const tags = useRef([]);

    useEffect(() => {
        getAlbumInfo()
    }, []);

    useEffect(() => {
        if(loading){
            photos.current = []
            tags.current = []
            getAlbumInfo()
        }
    }, [loading]);

    async function getAlbumInfo(){
        try{
            let response = await axios.get(`http://127.0.0.1:5000/api/album/${albumId}`,{
                headers:{
                Authorization: 'Bearer ' + token
                }
            })
            album.current = response.data
            days.current = response.data.days
            if(photos.current.length === 0){days.current.forEach(day => photos.current = photos.current.concat(day.photos))}
            if(tags.current.length === 0){photos.current.forEach(photoTags => tags.current = tags.current.concat(photoTags.tags))}
            setcurrentTrip(response.data.current_trip)
            setLoading(false)
        }
        catch{
            console.log(`Error in getting album id:${albumId}`)
        }
    }

    return (
        <main className='album-details content'>
            {!loading?<>
                <DisplayAlbum album={album.current} />
                {currentTrip? <DayForm album={album.current} auth={auth} setReload={setLoading}/> : null}
                <DisplayDays days={days.current} album={album}/>
            </>:null}
        </main>
    );
}

export default AlbumDetailPage;