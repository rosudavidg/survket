import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const FooterFacebook = () => {
  return (
    <div className="footer-facebook">
      <FontAwesomeIcon icon={faFacebook} color="beige" />
      <div className="footer-facebook-text">Like on Facebook</div>
    </div>
  );
};

const FooterEmail = () => {
  return (
    <div className="footer-email">
      <FontAwesomeIcon icon={faEnvelope} />
      <div className="footer-facebook-email">Email</div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-contact">
        <FooterFacebook />
        <FooterEmail />
      </div>
      <div className="footer-copyright">&copy; 2020 Survket</div>
    </div>
  );
};

export default Footer;
