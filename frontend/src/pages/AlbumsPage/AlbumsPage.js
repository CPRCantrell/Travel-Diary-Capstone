import React, { useState } from 'react';

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

    return (
        <main className='albums content'>
            <Search setResults={setResults} auth={auth} />
            {results === undefined ? <>
                <DisplayAllAlbums />
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