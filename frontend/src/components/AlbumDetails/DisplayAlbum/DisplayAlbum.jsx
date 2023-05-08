import React, { useState } from 'react';

import Modal from '../../elements/Modal/Modal'
import Share from './Share/Share';
import defaultImage from '../../../assests/image-default.svg.png'
import optionIcon from  '../../../assests/icons/three-dots.svg'
import useGlobalVariables from '../../../hooks/useGlobalVariables';

import './DisplayAlbum.scss'

const DisplayAlbum = ({ album, reload, showShare }) => {

    const [share, setShare] = useState(false);
    const [baseUrl, auth] = useGlobalVariables()

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
            <img src={album.cover_image ? (baseUrl+'/photo/'+album.cover_image):defaultImage} alt='default' className='cover'/>
            <div>
                <h1>{album.title}</h1>
                {determineLocationDisplay()}
                <p>{`${album.month} ${album.day}, ${album.year}`}</p>
            </div>
            {showShare? <button onClick={()=>setShare(!share)} className='share-btn'><img src={optionIcon} alt='options' /></button>:null}
            <Modal show={share} setShow={()=>setShare(!share)} >
                <Share album={album} reload={reload} />
            </Modal>
        </div>
    );
}

export default DisplayAlbum;