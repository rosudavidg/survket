import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Login.css";

const Login = (props) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickRegister = () => {
    history.push("/register");
  };

  const onClickLogin = () => {
    axios
      .post("/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        let jwt_token = res.data;

        localStorage.setItem("token", jwt_token);

        props.updateMe();
        history.push("/");
      })
      .catch((e) => {
        setPassword("");
        alert(`Login failed!\nError: ${e.response.data.error}`);
      });
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form className="login-form">
        <label className="login-label">Email:</label>
        <input id="login-username" className="login-username" type="text" onChange={onChangeEmail}></input>
        <label className="login-label">Password:</label>
        <input
          id="login-password"
          className="login-password"
          type="password"
          value={password}
          onChange={onChangePassword}
        ></input>
        <input id="login-submit" className="login-submit" type="button" value="Sign in" onClick={onClickLogin}></input>
        <input
          id="login-register"
          className="login-register"
          type="button"
          value="Register"
          onClick={onClickRegister}
        ></input>
      </form>
    </>
  );
};

export default Login;
