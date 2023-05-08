import React, { useState, useEffect } from 'react';
import axios from 'axios'

import useGlobalVariables from '../../../../hooks/useGlobalVariables'

import './Share.scss'

const Share = ({ album, reload }) => {

    const [friends, setFriends] = useState([]);
    const [choosenFriend, setChoosenFriend] = useState('');
    const [baseUrl, auth] = useGlobalVariables()
    const already_share_with_users = album.users

    useEffect(() => {
        getFriends()
    }, []);

    async function getFriends(){
        try{
            let response = await axios.get(baseUrl+'/friends',auth)
            let tempFriends = response.data.filter((friend)=>{
                let addFriend = true
                already_share_with_users.forEach((user)=>{
                    if(user.id == friend.friend_id){
                        addFriend = false
                    }
                })
                return addFriend
            })
            tempFriends = tempFriends.map(friend=>friend.friend)
            setFriends(tempFriends)
        }
        catch{
            console.log('issue getting friends')
        }
    }

    async function addShare(){
        try{
            let sharePackage = {user_id:choosenFriend, request:'share', data:String(album.id)}
            let response = await axios.post(baseUrl+'/requests',sharePackage,auth)
            reload()
        }
        catch{
            console.log('issues addingSharable')
        }
    }

    return (
        <div className='share' >
            <p>Already Shared Between:</p>
            {already_share_with_users.map((user, index)=>{
                return(
                    <div className='shared-user'>
                        <p className='user'>{`${user.first_name} ${user.last_name}`}</p>
                        <p className='username'>{user.username}</p>
                    </div>
                )
            })}
            <p className='warning-message'>*Private photos in Albums are visiable to all shared users*</p>
            <div className='input-box'>
                <select type='text' value={choosenFriend} onChange={(e)=>setChoosenFriend(e.target.value)}>
                    <option value=''></option>
                    {friends.length > 0 ?
                    <>
                        {friends.map((shareOption, index)=> <option key={index} value={shareOption.id}>{`${shareOption.first_name} ${shareOption.last_name}`}</option>)}
                    </>
                    :null}
                </select>
                <span>Select Friends to Share With</span>
                <i/>
            </div>
            <div className="center">
                <button onClick={()=>addShare()} className={'submit share-sumbit'}>Share</button>
            </div>
        </div>
    );
}

export default Share;