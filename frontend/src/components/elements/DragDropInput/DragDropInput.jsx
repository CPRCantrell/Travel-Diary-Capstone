import React, { useRef } from 'react';

import uploadIcon from '../../../assests/icons/upload.svg'

import './DragDropInput.scss'

const DragDropInput = React.forwardRef(({selectedFile, setSelectedFile }, ref) => {

    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover')
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover')
    const onDrop = () => wrapperRef.current.classList.remove('dragover')

    function handleChange(event){
        let file = event.target.files[0]
        if(file.type.slice(0,6) !== 'image/')
            alert('not an acceptable file')
        else
            setSelectedFile(file)
    }

    return (
        <div className={'drop-area'+ (selectedFile ? ' no-background':'')} ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onChange={(e)=>handleChange(e)}
        >
        {selectedFile ?
        (
            <div className='img-preview'>
                <img src={URL.createObjectURL(selectedFile)} alt='preview of file'/>
            </div>
        ):(
            <div className='drop-label'>
                <img src={uploadIcon} alt='upload Icon'/>
                <p>Drag & Drop File</p>
            </div>
        )
        }
            <input ref={ref} formEncType='multioart/form-data' type='file' name='photo' accept='image/*' required/>
        </div>
    );
})

export default DragDropInput