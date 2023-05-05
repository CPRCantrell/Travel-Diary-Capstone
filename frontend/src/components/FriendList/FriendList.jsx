import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useGlobalVariables from '../../hooks/useGlobalVariables'
import RequestButton from '../elements/RequestButton/RequestButton';

import './FriendList.scss'

const FriendList = () => {

    const [reload, setReload] = useState(false)
    const [friends, setFriends] = useState([]);
    const [potentialFriends, setPotentialFriends] = useState([]);
    const [addFriend, setAddFriend] = useState(false);
    const [baseUrl, auth] = useGlobalVariables()

    useEffect(() => {
        gatherFriends()
        gatherPotentialFriends()
    }, []);

    useEffect(() => {
        if(reload){
            gatherFriends()
            gatherPotentialFriends()
            setReload(false)
        }
    }, [reload]);

    async function gatherFriends(){
        try{
            let response = await axios.get(baseUrl+'/friends',auth)
            setFriends(response.data)
        }
        catch{
            console.log('issue gathering friends')
        }
    }

    async function gatherPotentialFriends(){
        try{
            let response = await axios.get(baseUrl+'/find-friends', auth)
            setPotentialFriends(response.data)
        }
        catch{
            console.log('issue Finding Friends') //tell me about it
        }
    }

    function selectButton(status, id){
        switch(status){
            case 'already_friend':
                return <RequestButton disable={true} text={'Friends'} />
            case 'pending_friend':
                return <RequestButton disable={true} text={'Sent'} />
            case 'waiting_friend':
                return <RequestButton sendTo={id} type={'accept/decline'} text={'Respond to Request'} reload={()=>setReload(!reload)}/>
            default:
                return <RequestButton dataId={id} reload={()=>setReload(!reload)}/>
        }
    }

    return (
        <div className='friend-list'>
            <div className='friend-list-nav'>
                <div className='input-box'>
                    <input type='text' />
                    <span>Search</span>
                    <i/>
                </div>
                <button onClick={()=>setAddFriend(!addFriend)}>{addFriend? 'cancel':'+ Friend'}</button>
            </div>
            {addFriend?
                <div>
                    {potentialFriends.length > 0 ? potentialFriends.map((potentialFriend,index)=>{
                        return(
                            <div key={index}>
                                <p>{potentialFriend.username}</p>
                                <p>{`${potentialFriend.first_name} ${potentialFriend.last_name}`}</p>
                                {selectButton(potentialFriend.friend_status,potentialFriend.user_id)}
                            </div>
                        )
                    }):null}
                </div>
            :
                <div>
                    {friends.length > 0 ? friends.map((friend,index) => {
                        return(
                            <div key={index}>
                                <p>{friend.friend.username}</p>
                                <p>{`${friend.friend.first_name} ${friend.friend.last_name}`}</p>
                            </div>
                        )
                    }):null}
                </div>
            }
        </div>
    );
}

export default FriendList;