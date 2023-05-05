import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Modal from '../elements/Modal/Modal';
import useGlobalVariables from '../../hooks/useGlobalVariables';
import RequestButton from '../elements/RequestButton/RequestButton';

import './Notification.scss'

const Notification = () => {

    const [notify, setNotify] = useState([]);
    const [requests, setRequests] = useState([]);
    const [baseUrl, auth] = useGlobalVariables()
    const [reload, setReload] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        getNotifications()
        getRequests()
    }, []);

    useEffect(() => {
        if(reload){
            getNotifications()
            getRequests()
            setReload(false)
        }
    }, [reload]);

    async function getNotifications(){
        try{
            let response = await axios.get(baseUrl+'/notifications', auth)
            setNotify(response.data)
        }
        catch{
            console.log('error getting notifications')
        }
    }

    async function getRequests(){
        try{
            let response = await axios.get(baseUrl+'/requests', auth)
            setRequests(response.data)
        }
        catch{
            console.log('error getting requests')
        }
    }

    async function deleteNote(note_id){
        try{
            let response = await axios.delete(baseUrl+'/notification/'+note_id , auth)
            setReload(true)
        }
        catch{
            console.log('error deleting notifications')
        }
    }

    return (
        <div className='notifications'>
            {notify.length > 0?
                <div>
                    <h1>Notifications</h1>
                    {notify.map((note, index)=>{
                        return(
                            <div key={index} onClick={note.navigate !== null ? ()=>navigate(note.navigate):null}>
                                <button onClick={()=>deleteNote(note.id)} >clear</button>
                                <p>{note.notification}</p>
                            </div>
                        )
                    })}
                </div>
            :null}
            {requests.length > 0?
                <div>
                    <h1>Requests</h1>
                    {requests.map((request, index)=>{
                        return(
                            <div key={index}>
                                <p>{request.requester.username}</p>
                                <p>{`${request.requester.first_name} ${request.requester.last_name}`}</p>
                                <RequestButton dataId={request.requester_id} type={'accept/decline-friend'} text={'Respond to Request'} reload={()=>setReload(!reload)}/>
                            </div>
                        )
                    })}
                </div>
            :null}
        </div>
    );
}

export default Notification;