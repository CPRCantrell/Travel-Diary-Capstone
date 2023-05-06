import React, { useState, useEffect } from 'react';
import { createRoutesFromChildren, useParams } from 'react-router-dom';

import DisplayAllAlbums from '../../components/Albums/DisplayAllAbums/DisplayAllAlbums';
import DisplayAlbumResults from '../../components/Albums/ResultDisplay/DisplayAlbumResults/DisplayAlbumResults';
import DisplayDayResults from '../../components/Albums/ResultDisplay/DisplayDayResults/DisplayDayResults';
import DisplayFriendResults from '../../components/Albums/ResultDisplay/DisplayFriendResults/DisplayFriendResults';
import DisplayPhotoResults from '../../components/Albums/ResultDisplay/DisplayPhotoResults/DisplayPhotoResults';
import Search from '../../components/Albums/Search/Search';
import useAuth from '../../hooks/useAuth';

import './AlbumsPage.scss'

const AlbumsPage = () => {

    const [results, setResults] = useState(undefined);
    const [user, token] = useAuth()
    const auth = {headers:{Authorization: 'Bearer ' + token}}
    const { username } = useParams()

    return (
        <main className='albums content'>
            <Search setResults={setResults} auth={auth} username={username}/>
            {results === undefined ? <>
                <DisplayAllAlbums  username={username}/>
                </>:<>
                {results.albums.length > 0 ? <DisplayAlbumResults albums={results.albums} /> :null}
                {results.days.length > 0 ? <DisplayDayResults days={results.days} /> :null}
                {results.photos.length > 0 ? <DisplayPhotoResults photos={results.photos} days={results.days} /> :null}
                <DisplayFriendResults />
            </>}
        </main>
    );
}

export default AlbumsPage;