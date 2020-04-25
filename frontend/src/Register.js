import React, { useState } from "react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

const Error = (props) => {
  return (
    <div className="register-error">
      <FontAwesomeIcon icon={faExclamationCircle} color="red" />
      <div className="register-error-message">{props.message}</div>
    </div>
  );
};

const Register = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRepeatError, setPasswordRepeatError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const onClickSubmit = () => {
    setEmailError(email === "");
    setPasswordError(password.length < 8);
    setPasswordRepeatError(password !== passwordRepeat);
    setFirstNameError(firstName === "");
    setLastNameError(lastName === "");
  };

  const onClickBack = () => {
    history.push("/login");
  };

  const onChangeEmail = (event) => {
    setEmailError(false);
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPasswordError(false);
    setPassword(event.target.value);
  };

  const onChangePasswordRepeat = (event) => {
    setPasswordRepeatError(false);
    setPasswordRepeat(event.target.value);
  };

  const onChangeFirstName = (event) => {
    setFirstNameError(false);
    setFirstName(event.target.value);
  };

  const onChangeLastName = (event) => {
    setLastNameError(false);
    setLastName(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <form className="register-form">
        <label>Email:</label>
        <input id="register-email" className="register-email" type="text" onChange={onChangeEmail}></input>
        {emailError && <Error message="Invalid email" />}
        <label>Password:</label>
        <input id="register-password" className="register-password" type="password" onChange={onChangePassword}></input>
        {passwordError && <Error message="Minimum length is 8" />}
        <label>Repeat password:</label>
        <input
          id="register-repeat-password"
          className="register-password"
          type="password"
          onChange={onChangePasswordRepeat}
        ></input>
        {passwordRepeatError && <Error message="Passwords are not the same" />}
        <label>First name:</label>
        <input
          id="register-first-name"
          className="register-first-name"
          type="text"
          onChange={onChangeFirstName}
        ></input>
        {firstNameError && <Error message="First name cannot be empty" />}
        <label>Last name:</label>
        <input id="register-last-name" className="register-last-name" type="text" onChange={onChangeLastName}></input>
        {lastNameError && <Error message="Last name cannot be empty" />}
        <label>Gender:</label>
        <select defaultValue="" id="register-gender" className="register-gender">
          <option value="">Prefer not to say</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <label>Date of birth:</label>
        <input
          defaultValue="1997-02-20"
          id="register-date"
          className="register-date"
          type="date"
          max="2000-01-02"
        ></input>
        <input
          id="register-submit"
          className="register-submit"
          type="button"
          value="Register"
          onClick={onClickSubmit}
        ></input>
        <input id="register-back" className="register-back" type="button" value="Back" onClick={onClickBack}></input>
      </form>
    </>
  );
};

export default Register;
