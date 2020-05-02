import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { isUserAuthenticated, getUserRole } from "./Auth.js";
import "./FAQ.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const FAQ = () => {
  const history = useHistory();
  const [faqs, setFaqs] = useState([]);
  const [faqsAdmin, setFaqsAdmin] = useState({ answered: [], not_answered: [] });

  const onClickBack = () => {
    history.goBack();
  };

  const getFAQs = async () => {
    if (
      isUserAuthenticated(localStorage.getItem("token")) &&
      (getUserRole(localStorage.getItem("token")) == "support" || getUserRole(localStorage.getItem("token")) == "admin")
    ) {
      const jwt_token = localStorage.getItem("token");
      axios
        .get("/questions/", {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        })
        .then((res) => {
          setFaqsAdmin(res.data);
        })
        .catch((err) => {
          alert("Cannot get FAQS!");
        });
    } else {
      axios
        .get(`/questions/faq`)
        .then((res) => {
          setFaqs(res.data);
        })
        .catch((err) => {
          alert(`Cannot get FAQS! ${err}`);
        });
    }
  };

  useEffect(() => {
    getFAQs();
  }, []);

  const onChangeAnswer = (event, id) => {
    const copy = { ...faqsAdmin };
    const msg = copy.not_answered.filter((e) => e.id === id);
    msg[0].answer = event.target.value;
    setFaqsAdmin(copy);
  };

  const onAnswerClick = (event, id) => {
    const msg = faqsAdmin.not_answered.filter((e) => e.id === id);
    console.log(msg[0].answer);

    const jwt_token = localStorage.getItem("token");
    axios
      .post(
        `/questions/${id}/answer`,
        { answer: msg[0].answer },
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      )
      .then((res) => {
        getFAQs();
      })
      .catch((err) => {
        alert("Error!");
      });
  };

  const onClickAddFaq = (event, id) => {
    const jwt_token = localStorage.getItem("token");
    axios
      .post(
        `/questions/${id}/setfaq`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      )
      .then((res) => {
        getFAQs();
      })
      .catch((err) => {
        alert("Error!");
      });
  };

  const onClickRemoveFaq = (event, id) => {
    const jwt_token = localStorage.getItem("token");
    axios
      .post(
        `/questions/${id}/unsetfaq`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      )
      .then((res) => {
        getFAQs();
      })
      .catch((err) => {
        alert("Error!");
      });
  };

  if (
    isUserAuthenticated(localStorage.getItem("token")) &&
    (getUserRole(localStorage.getItem("token")) == "support" || getUserRole(localStorage.getItem("token")) == "admin")
  ) {
    return (
      <>
        <div className="faq-container-notanswered">
          <div className="faq-title">New quesitons</div>
          {faqsAdmin.not_answered.length === 0 && <div>There are no new questions for you 😕</div>}
          {faqsAdmin.not_answered.map((e) => {
            return (
              <div key={e.id} className="faq-card">
                <label className="faq-label"> Question:</label>
                <div className="faq-question">{e.message}</div>
                <label className="faq-label"> Answer:</label>
                <textarea
                  rows="6"
                  cols="50"
                  id="contact-message"
                  className="faq-message"
                  type="text"
                  onChange={(event) => onChangeAnswer(event, e.id)}
                />
                <input
                  id="contact-submit"
                  className="contact-submit"
                  type="button"
                  value="Answer"
                  onClick={(event) => onAnswerClick(event, e.id)}
                ></input>
              </div>
            );
          })}
        </div>
        <div className="faq-container-answered">
          <div className="faq-title">Answered</div>
          {faqsAdmin.answered
            .sort((e, v) => e.id > v.id)
            .map((e) => {
              return (
                <div key={e.id} className="faq-card">
                  <div className="faq-fav">
                    {e.is_faq ? (
                      <FontAwesomeIcon icon={faStar} onClick={(event) => onClickRemoveFaq(event, e.id)} />
                    ) : (
                      <FontAwesomeIcon icon={faStarRegular} onClick={(event) => onClickAddFaq(event, e.id)} />
                    )}
                  </div>
                  <label className="faq-label"> Question:</label>
                  <div className="faq-question">{e.message}</div>
                  <label className="faq-label"> Answer:</label>
                  <div className="faq-answer">{e.answer}</div>
                </div>
              );
            })}
          <input id="faq-back" className="faq-back" type="button" value="Back" onClick={onClickBack}></input>
        </div>
      </>
    );
  } else {
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
  }
};

export default FAQ;
