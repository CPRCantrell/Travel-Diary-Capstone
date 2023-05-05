import React, { useState ,useContext, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import NewTripForm from "../NewTripForm/NewTripForm"
import Modal from "../elements/Modal/Modal";
import FriendList from "../FriendList/FriendList";
import Notification from "../Notifications/Notification";

import "./NavBar.scss";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const [newTrip, setNewTrip] = useState(false);
  const [friends, setFriends] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setNewTrip(false)
  }, [user]);

  return (
    <>{user ?
      <>
        <div className="nav-bar">
          <NavLink activeclassname='active' to="/home" className="link">
            <button onClick={()=>setNewTrip(false)}>Home</button>
          </NavLink>
          <NavLink activeclassname='active' to="/albums" className="link">
            <button onClick={()=>setNewTrip(false)}>Albums</button>
          </NavLink>
          <button onClick={logoutUser}>Logout</button>
          <button onClick={()=>setNewTrip(!newTrip)}>+Trip</button>
          <button onClick={()=>setFriends(!friends)}>friends</button>
          <Notification />
        </div>
        <Modal show={newTrip} setShow={setNewTrip}>
          <NewTripForm setModal={setNewTrip}/>
        </Modal>
        <Modal show={friends} setShow={setFriends}>
          <FriendList />
        </Modal>
      </>
    :null}</>
  );
};

export default Navbar;
