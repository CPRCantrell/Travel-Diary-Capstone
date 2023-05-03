import defaultImage from '../../../assests/image-default.svg.png'

import './DisplayAlbum.scss'

const DisplayAlbum = ({ album }) => {

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
            </div>
        </div>
    );
}

export default DisplayAlbum;