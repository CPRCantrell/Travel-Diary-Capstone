import useGlobalVariables from '../../../hooks/useGlobalVariables';

import './DisplayPhotos.scss'

const DisplayPhotos = ({ photos, auth }) => {

    const [base_url] = useGlobalVariables()

    return (
        <div className='photos'>
            {photos.map((photo, index) => {
                return(
                    <div key={index} className='photo'>
                        <img src={base_url+'/photo/'+photo.id} alt='your vaction'/>
                        <p>{`Caption: ${photo.caption}`}</p>
                        <p>{`Tags: ${photo.tags.map(tag => tag.user_id ? tag.user_id : tag.friend_without_user_id)}`}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default DisplayPhotos;