import React from "react";
import { useHistory } from "react-router-dom";
import Nav from "./Nav.js";
import "./Header.css";

const Header = () => {
  const history = useHistory();
  const onClickTitle = () => {
    history.push("/");
  };

  return (
    <div className="header">
      <div className="header-title" onClick={onClickTitle}>
        Survket
      </div>
      <div className="header-nav">
        <Nav />
      </div>
    </div>
  );
};

export default Header;
