import React from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Login.css";

const Login = () => {
  const history = useHistory();

  const onClickRegister = () => {
    history.push("/register");
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form className="login-form">
        <input id="login-username" className="login-username" type="text" placeholder="Email"></input>
        <input id="login-password" className="login-password" type="password" placeholder="Password"></input>
        <input id="login-submit" className="login-submit" type="submit" value="Sign in"></input>
        <input
          id="login-register"
          className="login-register"
          type="submit"
          value="Register"
          onClick={onClickRegister}
        ></input>
      </form>
    </>
  );
};

export default Login;
