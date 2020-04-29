import React from "react";
import "./Footer.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCookie } from "@fortawesome/free-solid-svg-icons";

const FooterFacebook = () => {
  return (
    <a className="f-facebook" href="https://www.facebook.com/survket">
      <div className="footer-facebook">
        <FontAwesomeIcon icon={faFacebook} color="beige" />
        <div className="footer-facebook-text">Like on Facebook</div>
      </div>
    </a>
  );
};

const FooterEmail = () => {
  return (
    <a className="f-email" href="mailto:survket@gmail.com">
      <div className="footer-email">
        <FontAwesomeIcon icon={faEnvelope} />
        <div className="footer-facebook-email">Email</div>
      </div>
    </a>
  );
};

const TermsLink = (props) => {
  return (
    <div className="footer-terms f-terms" onClick={props.redirect}>
      <FontAwesomeIcon icon={faCookie} />
      <div className="footer-facebook-email">Terms</div>
    </div>
  );
};

const Footer = () => {
  const history = useHistory();

  const redirectToTerms = () => {
    console.log("aici");
    history.push("/terms");
  };

  return (
    <div className="footer">
      <div className="footer-contact">
        <FooterFacebook />
        <FooterEmail />
        <TermsLink redirect={redirectToTerms} />
      </div>
      <div className="footer-copyright">&copy; 2020 Survket</div>
    </div>
  );
};

export default Footer;
