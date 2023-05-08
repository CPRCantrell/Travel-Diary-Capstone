import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from '../../elements/Modal/Modal';
import DragDropInput from '../../elements/DragDropInput/DragDropInput';
import useGlobalVariables from '../../../hooks/useGlobalVariables';
import SwitchInput from '../../elements/SwitchInput/SwitchInput'

import './AddPhoto.scss'

const AddPhoto = ({auth, day, setReload }) => {

    const [base_url] = useGlobalVariables()
    const [selectedPhoto, setSelectedPhoto] = useState();
    const [photoCaption, setPhotoCaption] = useState('');
    const [photoPrivacy, setPhotoPrivacy] = useState(false);
    const [photoModal, setPhotoModal] = useState(false);
    const [albumCover, setAlbumCover] = useState(false);
    const imageRef = React.createRef();

    useEffect(() => {
        if(photoModal){
            setPhotoPrivacy(false)
            setPhotoCaption('')
        }else{
            setSelectedPhoto(undefined)
        }
    }, [photoModal]);

    function handleSubmit(event){
        event.preventDefault()
        const data = new FormData()
        data.append('file', imageRef.current.files[0])
        data.append('caption', photoCaption)
        data.append('day_id', day.id)
        data.append('private', photoPrivacy)
        data.append('album_cover', albumCover)
        submitData(data)
    }

    async function submitData(data){
        try{
            let response = await axios.post(base_url+'/photos',data,auth)
            setPhotoModal(false)
            setReload(true)
        }
        catch{
            console.log('error with posting photo')
        }
    }

    function handleImage(response){
        setSelectedPhoto(response)
        setPhotoModal(true)
    }

    return (
        <div>
            <DragDropInput ref={imageRef} selectedFile={selectedPhoto} setSelectedFile={(response)=>handleImage(response)} />
            <Modal show={photoModal} setShow={()=>setPhotoModal(false)}>
                <form className='photo-info' onSubmit={(e)=>handleSubmit(e)}>
                    {selectedPhoto ? <img src={URL.createObjectURL(selectedPhoto)} alt='preview of file'/>:null}
                    <div className="photo-fill">
                        <div className='caption'>
                            <label>Caption</label>
                            <textarea name='caption' rows='8' cols='50' value={photoCaption} onInput={(e)=>setPhotoCaption(e.target.value)} placeholder='So You Never Forget'/>
                        </div>
                        <div className='photo-options'>
                            <div className='space-setting'>
                                <label>Set Private</label>
                                <SwitchInput checked={photoPrivacy} onChange={()=>setPhotoPrivacy(!photoPrivacy)} name='private' />
                            </div>
                            <div className='space-setting'>
                                <label>Set Album Cover</label>
                                <SwitchInput checked={albumCover} onChange={()=>setAlbumCover(!albumCover)} name='Album-Cover' />
                            </div>
                        </div>
                        <input type='submit' value='Submit' />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AddPhoto;