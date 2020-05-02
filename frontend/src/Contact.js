import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onClickBack = () => {
    history.push("/");
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const onClickSubmit = () => {
    axios
      .post("/questions", {
        email,
        subject,
        message,
      })
      .then((res) => {
        alert("Successfully submitted!");
        history.push("/");
      })
      .catch((e) => {
        alert(`Submit failed!\nError: ${e.response.data.error}`);
      });
  };

  return (
    <div className="contact-form">
      <label className="contact-title">Contact</label>
      <label>Email:</label>
      <input id="contact-email" className="contact-email" type="text" onChange={onChangeEmail} />
      <label>Subject:</label>
      <input id="contact-subject" className="contact-subject" type="text" onChange={onChangeSubject} />
      <label>Message:</label>
      <textarea
        rows="6"
        cols="50"
        id="contact-message"
        className="contact-message"
        type="text"
        onChange={onChangeMessage}
      />
      <label className="contact-note">Before submit your question, please check FAQ page.</label>
      <input
        id="contact-submit"
        className="contact-submit"
        type="button"
        value="Submit"
        onClick={onClickSubmit}
      ></input>
      <input id="contact-back" className="contact-back" type="button" value="Back" onClick={onClickBack}></input>
    </div>
  );
};

export default Contact;
