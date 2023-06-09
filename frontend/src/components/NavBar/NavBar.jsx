import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import NewTripForm from "../NewTripForm/NewTripForm"
import Modal from "../elements/Modal/Modal";
import FriendList from "../FriendList/FriendList";
import Notification from "../Notifications/Notification";

import bellIcon from '../../assests/icons/bell.svg';
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
          <div className="logout">
            <button onClick={()=>handleLogout()}><span>&lArr;</span>Logout</button>
          </div>

          <div className="nav-pages">
            <NavLink activeclassname='active' to="/home" className="link">
              <button onClick={()=>setModal('')}>Home</button>
            </NavLink>
            <NavLink activeclassname='active' to="/albums" className="link">
              <button onClick={()=>setModal('')}>Albums</button>
            </NavLink>
            <NavLink activeclassname='active' to="/social" className="link">
              <button onClick={()=>setModal('friend')}>Social</button>
            </NavLink>
          </div>

          <h1 className="logo">Travel Diary</h1>

          <div className="pop-ups">
            <button onClick={()=>setModal('note')} className="bell"><img src={bellIcon} atl='notifications'/></button>
            <button onClick={()=>setModal('trip')} className={"add-trip" + modal == ' trip' ? "active":null}>+ Add Albums</button>
          </div>

        </div>
        <Modal show={modal == 'trip'} setShow={()=>setModal('')}>
          <NewTripForm setModal={()=>setModal('')}/>
        </Modal>
        <Modal show={modal == 'friend'} setShow={()=>setModal('')}>
          <FriendList setModal={()=>setModal('')} />
        </Modal>
        <Modal show={modal == 'note'} setShow={()=>setModal('')}>
          <Notification />
        </Modal>
      </>
    :null}</>
  );
};

export default Navbar;
