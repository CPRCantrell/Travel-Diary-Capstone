import React, { useContext, useEffect } from "react";
import AuthContext from "../../../../context/AuthContext";
import useCustomForm from "../../../../hooks/useCustomForm";
import "./Login.scss";

const Login = ({signUp}) => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <main className="login-content">
      <div className={isServerError? "login-error-effect":"login-effect"}>
        <form className="login-form" onSubmit={handleSubmit}>
          <>
            {isServerError?
              <p className="alert error">Username or Password was incorrect</p>
            :null}
          </>
          <h1>Sign in</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="off"
              required="required"/>
            <span>Username</span>
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
          <div className="links">
            <a href="#">Fogot Password</a>
            <p onClick={()=>signUp(false)}>Signup</p>
          </div>
          <input type="submit" value='Login'/>
        </form>
      </div>
    </main>
  );
};

export default Login;
