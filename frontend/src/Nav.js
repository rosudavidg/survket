import React from "react";
import { isUserAuthenticated } from "./Auth.js";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const history = useHistory();

  const onClickSignOut = () => {
    localStorage.clear("token");
    history.push("/");
  };

  if (isUserAuthenticated(localStorage.getItem("token"))) {
    return <input type="submit" value="Sign out" onClick={onClickSignOut}></input>;
  } else {
    return <></>;
  }
};

export default Nav;
