import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';
import DisplayAlbum from '../../components/AlbumDetails/DisplayAlbum/DisplayAlbum';
import DisplayDays from '../../components/AlbumDetails/DisplayDays/DisplayDays';

import './AlbumDetailPage.scss'

const AlbumDetailPage = () => {

    const { albumId } = useParams()
    const [user, token] = useAuth()

    const [loading, setLoading] = useState(true);
    const album = useRef([]);
    const days = useRef([]);
    const photos = useRef([]);
    const tags = useRef([]);

    useEffect(() => {
        getAlbumInfo()
    }, []);

    async function getAlbumInfo(){
        try{
            let response = await axios.get(`http://127.0.0.1:5000/api/album/${albumId}`,{
                headers:{
                    Authorization: 'Bearer ' + token
                }
            })
            album.current = response.data
            days.current = response.data.days
            days.current.map(day => day.photos).forEach(dayPhotos => photos.current = [...photos.current, ...dayPhotos])
            photos.current.map(photo => photo.tags).forEach(phototags => tags.current = [...tags.current, ...phototags])
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
                <DisplayDays days={days.current} />
            </>:null}
        </main>
    );
}

export default AlbumDetailPage;