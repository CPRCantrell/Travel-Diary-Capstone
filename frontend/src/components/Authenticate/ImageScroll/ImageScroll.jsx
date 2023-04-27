import React, { useState, useEffect} from 'react';

import './ImageScroll.scss'

const ImageScroll = ({animate}) => {

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState({});
    var counter = [...Array(25)].map((counter, index) => index+1)


    useEffect(() => {
        let tempHolder = {}
        let img = require.context('../../../assests/authpage', false, /\.(jpg)$/)
        img.keys().forEach((image) => {tempHolder[image.replace('./','')] = img(image)})
        setImages(tempHolder)
        setLoading(false)
    }, []);

    return (
        <div className='image-scroll'>
            {!loading ?
            <div className={`animate ${animate}`}>
                {[...Array(30)].map((num, index) => {
                    num = counter[Math.floor(Math.random()*counter.length)]
                    delete counter[counter.indexOf(num)]
                    return(
                        <img key={index} src={images[`art-${num}.jpg`]} alt=''/>
                    )
                })}
            </div>
            :null}
        </div>
    );
}

export default ImageScroll;