import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';

import './DisplayAlbums.scss'

const DisplayAlbums = () => {

    const [user, token] = useAuth()
    const navigation = useNavigate()

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getAlbums()
    }, []);

    async function getAlbums(){
        try{
            let response = await axios.get('http://127.0.0.1:5000/api/albums', {
                headers:{
                    Authorization: 'Bearer ' + token,
                }
            })
            setAlbums(response.data)
        }
        catch{
            console.log('Error when getting albums')
        }
    }

    return (
        <div className='display-albums'>
            {albums.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Continent</th>
                            <th>All Days In Country</th>
                            <th>Country</th>
                            <th>All Days In City</th>
                            <th>City</th>
                            <th>Month</th>
                            <th>Day</th>
                            <th>Year</th>
                            <th>Private</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albums.map((album, index) => {
                            return(
                                <tr key={index} onClick={()=>navigation(`/album-detail/${album.id}`)}>
                                    <td>{album.title}</td>
                                    <td>{album.latitude}</td>
                                    <td>{album.longitude}</td>
                                    <td>{album.continent}</td>
                                    <td>{`${album.all_days_in_same_country}`}</td>
                                    <td>{album.country}</td>
                                    <td>{`${album.all_days_in_same_city}`}</td>
                                    <td>{album.city}</td>
                                    <td>{album.month}</td>
                                    <td>{album.day}</td>
                                    <td>{album.year}</td>
                                    <td>{`${album.private}`}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            :null}
        </div>
    );
}

export default DisplayAlbums;