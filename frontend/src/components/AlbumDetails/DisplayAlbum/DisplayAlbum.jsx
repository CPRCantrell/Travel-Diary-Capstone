import defaultImage from '../../../assests/image-default.svg.png'
import './DisplayAlbum.scss'

const DisplayAlbum = ({album}) => {
    return (
        <div className='display-album'>
            <img src={defaultImage} alt='default' className='cover'/>
            <h1>{album.title}</h1>
            <p>{`${album.month} ${album.day}, ${album.year}`}</p>
        </div>
    );
}

export default DisplayAlbum;