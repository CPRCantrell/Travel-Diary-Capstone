import React, { useRef } from 'react';

import './Modal.scss'

const Modal = ({ children, show, setShow }) => {

    const modalRef = useRef()

    function handleOutsideClick(event){
        if(event.target === modalRef.current){
            setShow(!show)
        }
    }

    return (
        <>{show?
            <div className='modal' ref={modalRef} onClick={(e)=>handleOutsideClick(e)}>
                <div className='m-area'>
                    <button className='m-close' onClick={()=>setShow(!show)}>X</button>
                    {children}
                </div>
            </div>
        :null}</>
    );
}

export default Modal;