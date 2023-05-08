import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import useGlobalVariables from '../../hooks/useGlobalVariables';
import DisplayAlbum from '../../components/AlbumDetails/DisplayAlbum/DisplayAlbum';
import DisplayDays from '../../components/AlbumDetails/DisplayDays/DisplayDays';
import DayForm from '../../components/AlbumDetails/DayForm/DayForm';

import './AlbumDetailPage.scss'

const AlbumDetailPage = () => {

    const { albumId, username } = useParams()
    const [baseUrl, auth] = useGlobalVariables()

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
            let response
            if(username === undefined){
                response = await axios.get(baseUrl+'/album/'+ albumId,auth)
            }else{
                response = await axios.get(baseUrl+'/al/'+ username + '/' + albumId,auth)
            }
            album.current = response.data
            days.current = response.data.days
            if(photos.current.length === 0){days.current.forEach(day => photos.current = photos.current.concat(day.photos))}
            setcurrentTrip(response.data.current_trip)
            setLoading(false)
        }
        catch{
            console.log(`Error in getting album id:${albumId}`)
        }
    }

    return (
        <main className='album-details content'>
            {!loading? <>
                {album.current.cover_image ? <img src={baseUrl+'/photo/'+album.current.cover_image} alt='default' className='background-img'/>:null}
                <div className='scroll-area'>
                    <div className='detail-content'>
                        <DisplayAlbum album={album.current} reload={()=>setLoading(!loading)} showShare={username === undefined} />
                        {currentTrip && username === undefined ? <DayForm album={album.current} auth={auth} setReload={setLoading}/> : null}
                        <DisplayDays days={days.current} album={album}/>
                    </div>
                </div>
            </>:null}
        </main>
    );
}

export default AlbumDetailPage;