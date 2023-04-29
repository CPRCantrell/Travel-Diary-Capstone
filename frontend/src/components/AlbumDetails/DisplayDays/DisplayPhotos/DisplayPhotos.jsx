import './DisplayPhotos.scss'

const DisplayPhotos = ({ photos }) => {
    return (
        <div className='photos'>
            {photos.map((photo, index) => {
                return(
                    <div key={index} className='photo'>
                        <p>{photo.file_location}</p>
                        <p>{`Caption: ${photo.caption}`}</p>
                        <p>{`Tags: ${photo.tags.map(tag => tag.user_id ? tag.user_id : tag.friend_without_user_id)}`}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default DisplayPhotos;