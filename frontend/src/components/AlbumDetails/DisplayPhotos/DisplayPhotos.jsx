import axios from 'axios';

import './DisplayPhotos.scss'

const DisplayPhotos = ({ photos, auth }) => {

    async function getImage(photo){
        try{
            let request = await axios.get('http://127.0.0.1:5000/api/photo/'+photo,auth)
            return request.data
        }
        catch{
            console.log('Error fetching photo')
        }
    }

    return (
        <div className='photos'>
            {photos.map((photo, index) => {
                return(
                    <div key={index} className='photo'>
                        <img src={getImage(photo.id)} alt='' />
                        <p>{`Caption: ${photo.caption}`}</p>
                        <p>{`Tags: ${photo.tags.map(tag => tag.user_id ? tag.user_id : tag.friend_without_user_id)}`}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default DisplayPhotos;