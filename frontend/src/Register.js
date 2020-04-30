import React, { useState } from "react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import axios from "axios";

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
  const [accountType, setAccountType] = useState("user_solver");
  const [company, setCompany] = useState("");
  const [dob, setDob] = useState("1970-01-30");
  const [gender, setGender] = useState(undefined);
  const [gdpr, setGdpr] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRepeatError, setPasswordRepeatError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [gdprError, setGdprError] = useState(false);

  const onClickSubmit = () => {
    let anyError = false;

    setEmailError(email === "" && (anyError = true));
    setPasswordError(password.length < 8 && (anyError = true));
    setPasswordRepeatError(password !== passwordRepeat && (anyError = true));
    setFirstNameError(firstName === "" && (anyError = true));
    setLastNameError(lastName === "" && (anyError = true));
    setCompanyError(accountType === "user_creator" && company === "" && (anyError = true));
    setGdprError(gdpr === false && (anyError = true));

    if (!anyError) {
      register();
    }
  };

  const register = async () => {
    axios
      .post("http://192.168.100.6:8888/users/register", {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dob,
        role: accountType,
        company_name: company,
        gender: gender,
        password: password,
        email: email,
      })
      .then((res) => {
        alert("Successfully registered!\nPlease verify your email!");
        history.push("/");
      })
      .catch((e) => {
        alert(`Register failed!\nError: ${e.response.data.error}`);
      });
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

  const onChangeAccountType = (event) => {
    setAccountType(event.target.value);
  };

  const onChangeGender = (event) => {
    if (event.target.value == "") {
      setGender(undefined);
    } else {
      setGender(event.target.value);
    }
  };

  const onChangeCompany = (event) => {
    setCompanyError(false);
    setCompany(event.target.value);
  };

  const onChangeDob = (event) => {
    setDob(event.target.value);
  };

  const onChangeGdpr = (event) => {
    setGdpr(event.target.checked);
    setGdprError(false);
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <form className="register-form">
        <div className="register-title">Register</div>
        <label>Email:</label>
        <input id="register-email" className="register-email email" type="text" onChange={onChangeEmail}></input>
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
        <select defaultValue="" id="register-gender" className="register-gender" onChange={onChangeGender}>
          <option value="">Prefer not to say</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <label>Account type:</label>
        <select
          onChange={onChangeAccountType}
          defaultValue=""
          id="register-account-type"
          className="register-account-type"
        >
          <option value="user_solver">Solver</option>
          <option value="user_creator">Creator</option>
        </select>
        {accountType == "user_creator" && (
          <>
            <label>Company name:</label>
            <input id="register-company" className="register-company" type="text" onChange={onChangeCompany}></input>
            {companyError && <Error message="Invalid company name" />}
          </>
        )}
        <label>Date of birth:</label>
        <input
          defaultValue="1970-01-30"
          id="register-date"
          className="register-date"
          type="date"
          onChange={onChangeDob}
        ></input>
        <div className="form-gdpr">
          <input className="check-box" type="checkbox" onChange={onChangeGdpr} />
          <div
            className="gdpr-label"
            onClick={() => {
              history.push("/terms");
            }}
          >
            I agree to Survket's Terms & Conditions and Privacy Policy
          </div>
        </div>
        {gdprError && <Error message="You have to agree Terms & Conditions" />}
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
