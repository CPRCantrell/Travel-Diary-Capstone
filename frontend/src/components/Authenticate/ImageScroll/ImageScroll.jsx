import React, { useState, useEffect, useRef } from 'react';

import './ImageScroll.scss'

const ImageScroll = ({ flipDirection = false }) => {

    const [images, setImages] = useState({loaded:false});
    const [divHeight, setDivHeight] = useState(flipDirection? {top: '0px'}:{bottom: '0px'})
    const moveRef = useRef(0)
    const count = useRef(0)
    var counter = [...Array(25)].map((num, index) => index+1)

    useEffect(() => {
        if(!images['loaded']){
            setUpImages()
        }
    }, []);

    function setUpImages(){
        let tempHolder = {}
        let img = require.context('../../../assests/authpage', false, /\.(jpg)$/)
        img.keys().forEach((image) => {tempHolder[image.replace('./','')] = img(image)})
        tempHolder['loaded'] = true
        setImages(tempHolder)
    }

    function addHeight(height){
        let check = flipDirection? 'top':'bottom'
        if(divHeight[check] === '0px'){
            moveRef.current += height
            count.current++
            if(count.current === 25){
                let calc = `calc(${moveRef.current*-1 + 'px'} + 100vh)`
                let temp = flipDirection? {top: calc}:{bottom: calc}
                setDivHeight(temp)
            }
        }
    }

    return (
        <div className='image-scroll'>
            {images['loaded'] ?<>
                <div className={`animate`} style={divHeight} onLoad={(e)=>addHeight(e.target.scrollHeight)}>
                    {[...Array(25)].map((num, index) => {
                        let randomIndex = (Math.floor(Math.random()*(counter.length-(index+1))));
                        [counter[randomIndex], counter[(counter.length-(index+1))]] = [counter[(counter.length-(index+1))], counter[randomIndex]]
                        let img = counter.pop()
                        return(
                            <img key={index} src={images[`art-${img}.jpg`]} alt='' />
                        )
                    })}
                </div>
            </>:null}
        </div>
    );
}

export default ImageScroll;