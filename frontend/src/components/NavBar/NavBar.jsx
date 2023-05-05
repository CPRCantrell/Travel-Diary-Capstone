import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import NewTripForm from "../NewTripForm/NewTripForm"
import Modal from "../elements/Modal/Modal";
import FriendList from "../FriendList/FriendList";
import Notification from "../Notifications/Notification";

import "./NavBar.scss";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const [modal, setModal] = useState('');
  const navigate = useNavigate();

  function handleLogout(){
    setModal('')
    logoutUser()
  }

  return (
    <>{user ?
      <>
        <div className="nav-bar">
          <NavLink activeclassname='active' to="/home" className="link">
            <button onClick={()=>setModal('')}>Home</button>
          </NavLink>
          <NavLink activeclassname='active' to="/albums" className="link">
            <button onClick={()=>setModal('')}>Albums</button>
          </NavLink>
          <button onClick={()=>handleLogout()}>Logout</button>
          <button onClick={()=>setModal('trip')}>+Trip</button>
          <button onClick={()=>setModal('friend')}>friends</button>
          <button onClick={()=>setModal('note')}>Notification</button>
        </div>
        <Modal show={modal == 'trip'} setShow={()=>setModal('')}>
          <NewTripForm setModal={()=>setModal('')}/>
        </Modal>
        <Modal show={modal == 'friend'} setShow={()=>setModal('')}>
          <FriendList />
        </Modal>
        <Modal show={modal == 'note'} setShow={()=>setModal('')}>
          <Notification />
        </Modal>
      </>
    :null}</>
  );
};

export default Navbar;
