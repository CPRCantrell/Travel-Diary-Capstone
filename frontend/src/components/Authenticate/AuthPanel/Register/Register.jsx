import React, { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import useCustomForm from "../../../../hooks/useCustomForm";
import "./Register.scss";

const Register = ({signIn}) => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
    );

    return (
      <main className="register-content">
      <div className="register-effect">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-title">
            <h1>Register</h1>
            <button className="links" onClick={()=>signIn(true)}>Sign in</button>
          </div>
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="off"
              required="required"></input>
            <span>Username</span>
            <i></i>
          </div>
          <div className="input-box">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              autoComplete="off"
              required="required"/>
            <span>first Name</span>
            <i></i>
          </div>
          <div className="input-box">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              autoComplete="off"
              required="required"/>
            <span>Last Name</span>
            <i></i>
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
              required="required"/>
            <span>Email</span>
            <i></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="off"
              required="required"/>
            <span>Password</span>
            <i></i>
          </div>
          <input type="submit" value='Create Account'/>
        </form>
      </div>
    </main>
  );
};

export default Register;
