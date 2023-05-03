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
            <Modal show={photoModal} setShow={setPhotoModal}>
                <form className='photo-info' onSubmit={(e)=>handleSubmit(e)}>
                    {selectedPhoto ? <img src={URL.createObjectURL(selectedPhoto)} alt='preview of file'/>:null}
                    <div>
                        <label>Photo Caption</label>
                        <textarea name='caption' value={photoCaption} onInput={(e)=>setPhotoCaption(e.target.value)}/>
                    </div>
                    <div>
                        <label>Set Private</label>
                        <SwitchInput checked={photoPrivacy} onChange={()=>setPhotoPrivacy(!photoPrivacy)} name='private' />
                    </div>
                    <input type='submit' value='Submit' />
                </form>
            </Modal>
        </div>
    );
}

export default AddPhoto;