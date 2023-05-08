import React, { useState, useEffect, useRef } from 'react';

import useGlobalVariables from '../../../hooks/useGlobalVariables';

import './DisplayPhotos.scss'

const DisplayPhotos = ({ photos }) => {

    const [textWidth, settextWidth] = useState();
    const [base_url] = useGlobalVariables()
    const imgRef = useRef()

    useEffect(() => {
        if(photos.length > 0){
            settextWidth(imgRef.current.scrollWidth+'px')
        }
    }, []);

    return (
        <div className='photos'>
            {photos.map((photo, index) => {
                return(
                    <div key={index} className='photo'>
                        <img src={base_url+'/photo/'+photo.id} alt='your vaction' ref={imgRef} />
                        <div style={{maxWidth: textWidth}} className='photo-text'>
                            <p>Caption:</p>
                            <p>{photo.caption}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default DisplayPhotos;