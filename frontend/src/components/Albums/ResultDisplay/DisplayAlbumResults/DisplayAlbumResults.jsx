import React, {  useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './DisplayAlbumResults.scss'

const DisplayAlbumResults = ({ albums, username }) => {

    const [navLink, setNavLink] = useState('');

    const navigation = useNavigate()

    useEffect(() => {
        if(username === undefined){
            setNavLink(`/album-detail/`)
        }else{
            setNavLink('/al/'+username+'/')
        }
    }, [username]);

    return (
        <div className='album-results'>
            <h1>---Albums---</h1>
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
                            <tr key={index} onClick={()=>navigation(navLink + album.id)}>
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
        </div>
    );
}

export default DisplayAlbumResults;