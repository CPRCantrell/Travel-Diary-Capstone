import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useGlobalVariables from '../../../hooks/useGlobalVariables';

import './DisplayAllAlbums.scss'

const DisplayAllAlbums = ({ username }) => {

    const [baseUrl, auth] = useGlobalVariables()
    const [navLink, setNavLink] = useState('');
    const navigation = useNavigate()

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        if(username === undefined){
            setNavLink(`/album-detail/`)
            getAlbums()
        }else{
            setNavLink('/al/'+username+'/')
            getFriendlyAlbums()
        }
    }, []);

    useEffect(() => {
        if(username === undefined){
            setNavLink(`/album-detail/`)
            getAlbums()
        }else{
            setNavLink('/al/'+username+'/')
            getFriendlyAlbums()
        }
    }, [username]);

    async function getAlbums(){
        try{
            let response = await axios.get(baseUrl+'/albums', auth)
            setAlbums(response.data)
        }
        catch{
            console.log('Error when getting albums')
        }
    }

    async function getFriendlyAlbums(){
        try{
            let response = await axios.get(baseUrl+'/albs/'+username, auth)
            setAlbums(response.data)
        }
        catch{
            console.log('Error when getting friendly albums')
        }
    }

    return (
        <div className='display-albums'>
            {albums.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Region</th>
                            <th>Country</th>
                            <th>State</th>
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
                                <tr key={index} onClick={()=>navigation(navLink+album.id)}>
                                    <td>{album.title}</td>
                                    <td>{album.region}</td>
                                    <td>{album.country}</td>
                                    <td>{album.state}</td>
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

export default DisplayAllAlbums;