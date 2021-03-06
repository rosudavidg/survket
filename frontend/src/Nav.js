import React from "react";
import { isUserAuthenticated } from "./Auth.js";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { getUserRole } from "./Auth.js";
import "./Nav.css";

const setCoinsAreVisible = () => {
  if (!isUserAuthenticated(localStorage.getItem("token"))) return false;

  const userRole = getUserRole(localStorage.getItem("token"));

  switch (userRole) {
    case "user_creator":
    case "user_solver":
      return true;
    case "admin":
    case "support":
      return false;
    default:
      return false;
  }
};

const Nav = (props) => {
  const coinsAreVisible = setCoinsAreVisible();
  const history = useHistory();

  const onClickSignOut = () => {
    localStorage.removeItem("token");
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
        <div className="nav-name">{props.me.name}</div>
        {coinsAreVisible && (
          <div className="nav-coins">
            <FontAwesomeIcon icon={faCoins} color="rgb(160, 139, 20)" style={{ "font-size": "1.3rem" }} />
            <div className="nav-coins-value">{props.me.coins}</div>
          </div>
        )}
        <div>
          <input className="nav-home" type="submit" value="Home" onClick={onClickHome}></input>
          <input className="nav-faq" type="submit" value="FAQ" onClick={onClickFAQ}></input>
          <input className="nav-contact" type="submit" value="Contact" onClick={onClickContact}></input>
          <input className="nav-signout" type="submit" value="Sign out" onClick={onClickSignOut}></input>
        </div>
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
