import React, { useState } from 'react';
import axios from 'axios';

import useGlobalVariables from '../../../hooks/useGlobalVariables';

import './RequestButton.scss'

const RequestButton = ({ info, sendTo, type='friend', disable=false, text='Send Friend Request', reload }) => {

    const [triggerAcceptDecline, setTriggerAcceptDecline] = useState(false);
    const [baseURL, auth] = useGlobalVariables()

    function buildButton(){
        switch(type){
            case 'accept/decline':
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
            let requestPackage = {request:'friend', user_id:sendTo}
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
                <button className='approve' onClick={()=>respondToRequest('approved')}>Approve</button>
                <button className='decline' onClick={()=>respondToRequest('declined')}>Decline</button>
            </div>
        }
        </>)
    }

    async function respondToRequest(status){
        try{
            info.status = status
            let request_response = await axios.patch(baseURL+'/requests',info,auth)
            reload()
        }
        catch{
            console.log('issue with response')
        }
    }

    return (<>{buildButton()}</>);
}

export default RequestButton;