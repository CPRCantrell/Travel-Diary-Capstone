import React from "react";
import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.scss";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <>{user ?
      <div className="nav-bar">
        <NavLink activeclassname='active' to="/home" className="link">
          <button>Home</button>
        </NavLink>
        <button onClick={logoutUser}>Logout</button>
        <NavLink activeclassname='active' to="/new" className="link">
          <button>+ Start Trip</button>
        </NavLink>
      </div>
    :null}</>
  );
};

export default Navbar;
