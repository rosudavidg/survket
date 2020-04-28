import React from "react";
import { isUserAuthenticated } from "./Auth.js";
import { useHistory } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const history = useHistory();

  const onClickSignOut = () => {
    localStorage.clear("token");
    history.push("/");
  };

  const onClickHome = () => {
    history.push("/");
  };

  const onClickFAQ = () => {
    history.push("/faq");
  };

  const onClickContact = () => {
    history.push("/contact");
  };

  if (isUserAuthenticated(localStorage.getItem("token"))) {
    return (
      <>
        <input className="nav-home" type="submit" value="Home" onClick={onClickHome}></input>
        <input className="nav-faq" type="submit" value="FAQ" onClick={onClickFAQ}></input>
        <input className="nav-contact" type="submit" value="Contact" onClick={onClickContact}></input>
        <input className="nav-signout" type="submit" value="Sign out" onClick={onClickSignOut}></input>
      </>
    );
  } else {
    return (
      <>
        <input className="nav-home" type="submit" value="Home" onClick={onClickHome}></input>
        <input className="nav-faq" type="submit" value="FAQ" onClick={onClickFAQ}></input>
        <input className="nav-contact" type="submit" value="Contact" onClick={onClickContact}></input>
      </>
    );
  }
};

export default Nav;
