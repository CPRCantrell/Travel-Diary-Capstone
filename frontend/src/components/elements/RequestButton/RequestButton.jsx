import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useGlobalVariables from '../../../hooks/useGlobalVariables';

import './RequestButton.scss'

const RequestButton = ({ dataId, type='friend', disable=false, text='Send Friend Request', reload }) => {

    const [triggerAcceptDecline, setTriggerAcceptDecline] = useState(false);
    const [baseURL, auth] = useGlobalVariables()

    function buildButton(){
        switch(type){
            case 'accept/decline-friend':
                return acceptDecline()
            default:
                return friend()
        }
    }

    function friend(){
        return(<button onClick={()=>sendFriendRequest()} disabled={disable}>{text}</button>)
    }

    async function sendFriendRequest(){
        try{
            let requestPackage = {request:'friend', user_id:dataId}
            let response = await axios.post(baseURL+'/requests',requestPackage,auth)
            reload()
        }
        catch{
            console.log('issue sending request')
        }
    }

    function acceptDecline(){
        return (<>
        {!triggerAcceptDecline?
            <button onClick={()=>setTriggerAcceptDecline(!triggerAcceptDecline)}>{text}</button>
        :
            <div className='aprrove-decline-area'>
                <button className='approve' onClick={()=>respondToFriendRequest('approved')}>Aprrove</button>
                <button className='decline' onClick={()=>respondToFriendRequest('declined')}>Decline</button>
            </div>
        }
        </>)
    }

    async function respondToFriendRequest(status){
        try{
            let requestPackage = {request:'friend', status:status, requester_id:dataId}
            let request_response = await axios.patch(baseURL+'/requests',requestPackage,auth)
            reload()
        }
        catch{
            console.log('issue with response')
        }
    }

    return (<>{buildButton()}</>);
}

export default RequestButton;