import { useNavigate } from 'react-router-dom';

import './DisplayPhotoResults.scss'
import DisplayPhotos from '../../../AlbumDetails/DisplayPhotos/DisplayPhotos';

const DisplayPhotoResults = ({photos, days}) => {

    const navagation = useNavigate()

    const images = photos.filter(photo => photo !== 0)

    return (
        <div className='photo-results'>
            <h1>---Photos---</h1>
            <DisplayPhotos photos={images} />
        </div>
    );
}

export default DisplayPhotoResults;