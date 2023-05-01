import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from '../../elements/Modal/Modal';
import DragDropInput from '../../elements/DragDropInput/DragDropInput';
import useGlobalVariables from '../../../hooks/useGlobalVariables';
import SwitchInput from '../../elements/SwitchInput/SwitchInput'

import './AddPhoto.scss'

const AddPhoto = ({auth, day}) => {

    const [base_url] = useGlobalVariables()
    const [selectedPhoto, setSelectedPhoto] = useState();
    const [photoCaption, setPhotoCaption] = useState('');
    const [photoPrivacy, setPhotoPrivacy] = useState(false);
    const [photoModal, setPhotoModal] = useState(false);

    useEffect(() => {
        if(selectedPhoto){
            setPhotoModal(true)
        }
        if(!photoModal){
            setSelectedPhoto(undefined)
        }
    }, [selectedPhoto]);

    function handleSubmit(event){
        event.preventDefault()

        const data = new FormData()
        data.append('file', selectedPhoto);
        data.append('caption', photoCaption);
        submitData(data)
    }

    async function submitData(data){
        try{
            let response = await axios.post(base_url+'/photos',data,auth)
        }
        catch{
            console.log('error with posting photo')
        }
    }

    return (
        <div>
            <DragDropInput selectedFile={selectedPhoto} setSelectedFile={setSelectedPhoto} />
            <Modal show={photoModal} setShow={setPhotoModal}>
                <form className='photo-info' onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <label>Photo Caption</label>
                        <textarea value={photoCaption} onInput={(e)=>setPhotoCaption(e.target.value)}/>
                    </div>
                    <div>
                        <label>Set Private</label>
                        <SwitchInput checked={photoPrivacy} onChange={()=>setPhotoPrivacy(!photoPrivacy)} />
                    </div>
                    <input type='submit' value='Submit' />
                </form>
            </Modal>
        </div>
    );
}

export default AddPhoto;