import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./FAQ.css";

const FAQ = () => {
  const history = useHistory();
  const [faqs, setFaqs] = useState([]);

  const onClickBack = () => {
    history.goBack();
  };

  const getFAQs = async () => {
    axios
      .get("http://192.168.100.6:8888/questions/faq")
      .then((res) => {
        setFaqs(res.data);
      })
      .catch((err) => {
        alert("Cannot get FAQS!");
      });
  };

  useEffect(() => {
    getFAQs();
  }, []);

  return (
    <div className="faq-container">
      <div className="faq-title">Frequently Asked Questions</div>
      {faqs.map((e) => {
        return (
          <div key={e.message} className="faq-card">
            <label className="faq-label"> Question:</label>
            <div className="faq-question">{e.message}</div>
            <label className="faq-label"> Answer:</label>
            <div className="faq-answer">{e.answer}</div>
          </div>
        );
      })}
      <input id="faq-back" className="faq-back" type="button" value="Back" onClick={onClickBack}></input>
    </div>
  );
};

export default FAQ;
