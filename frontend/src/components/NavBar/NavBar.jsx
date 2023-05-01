import React, { useState ,useContext, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import NewTripForm from "../NewTripForm/NewTripForm"
import Modal from "../elements/Modal/Modal";

import "./NavBar.scss";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const [newTrip, setNewTrip] = useState(false);
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
        </div>
        <Modal show={newTrip} setShow={setNewTrip}>
          <NewTripForm />
        </Modal>
      </>
    :null}</>
  );
};

export default Navbar;
