import React, { useState } from 'react';

import Modal from '../../elements/Modal/Modal'
import Share from './Share/Share';
import defaultImage from '../../../assests/image-default.svg.png'

import './DisplayAlbum.scss'

const DisplayAlbum = ({ album, reload, showShare }) => {

    const [share, setShare] = useState(false);

    function determineLocationDisplay(){
        if(album.all_days_in_same_city){
            return(
                <>{album.state === null ? <p>{album.city}</p>:<p>{`${album.city}, ${album.state}`}</p>}</>
            )
        }
        else if(album.all_days_in_same_country){
            return <p>{album.country}</p>
        }
        else{
            return <p>{album.region}</p>
        }
    }


    return (
        <div className='display-album'>
            <img src={defaultImage} alt='default' className='cover'/>
            <div>
                <h1>{album.title}</h1>
                <p>{`${album.month} ${album.day}, ${album.year}`}</p>
                {determineLocationDisplay()}
                {album.users.length > 1?
                    <div>
                        <p>Currently Shared With:</p>
                        {album.users.map((user, index)=>{
                            return(
                                <p key={index}>{`${user.username} : ${user.first_name} ${user.last_name}`}</p>
                            )
                        })}
                    </div>
                :null}
            </div>
            {showShare? <button onClick={()=>setShare(!share)}>Share</button>:null}
            <Modal show={share} setShow={()=>setShare(!share)} >
                <Share album={album} reload={reload} />
            </Modal>
        </div>
    );
}

export default DisplayAlbum;