import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./SurveySolve.css";

const SurveySolver = (props) => {
  const history = useHistory();
  const [survey, setSurvey] = useState({ name: "", reward: 0, surveys_choices: [], surveys_texts: [] });
  const [answers, setAnswers] = useState({ surveys_texts: [], surveys_choices: [] });

  const getSurvey = async () => {
    const jwt_token = localStorage.getItem("token");

    let res;
    try {
      res = await axios.get(`http://192.168.100.6:8888/surveys/${props.match.params.id}`, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      });

      setSurvey(res.data);
    } catch (e) {
      alert("Get surveys failed.");
    }
  };

  const solveSurvey = async () => {
    const jwt_token = localStorage.getItem("token");

    try {
      await axios.post(`http://192.168.100.6:8888/surveys/${props.match.params.id}/solve`, answers, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      });
      props.updateMe();
      history.push("/");
    } catch (e) {
      alert("Solve survey failed.");
    }
  };

  useEffect(() => {
    getSurvey();
  }, []);

  const onClickBack = () => {
    history.push("/");
  };

  const onChangeText = (event, id) => {
    const copy = { ...answers };
    const l = copy.surveys_texts.filter((e) => e.id === id);

    if (l.length === 0) {
      const e = { id, answer: event.target.value };
      copy.surveys_texts.push(e);
    } else {
      l[0].answer = event.target.value;
    }

    setAnswers(copy);
  };

  const onClickChoice = (event, choiceId, elemId) => {
    const copy = { ...answers };
    const l = copy.surveys_choices.filter((e) => Number(e.id) === Number(elemId));

    if (l.length === 0) {
      const e = { id: elemId, survey_choice_element_id: choiceId };
      copy.surveys_choices.push(e);
    } else {
      l[0].survey_choice_element_id = choiceId;
    }

    setAnswers(copy);
  };

  const onClickSubmit = () => {
    solveSurvey();
  };

  return (
    <form className="solver-survey">
      {survey.surveys_texts.map((elem) => {
        return (
          <div key={elem.id} className="solver-survey-text">
            <div className="solver-survey-text-question">{elem.question}</div>
            <input
              type="text"
              className="solver-survey-text-input"
              placeholder="Write your answer here..."
              onChange={(event) => onChangeText(event, elem.id)}
            />
          </div>
        );
      })}

      {survey.surveys_choices.map((elem) => {
        return (
          <div key={elem.id} className="solver-survey-choice">
            <div className="solver-survey-choice-question">{elem.question}</div>
            {elem.surveys_choices_elements.map((choice) => {
              return (
                <div key={choice.id} className="solver-survey-choice-option">
                  <input
                    className="solver-survey-choice-option-text-radio"
                    type="radio"
                    name={elem.id}
                    onClick={(event) => onClickChoice(event, choice.id, elem.id)}
                  ></input>
                  <label className="solver-survey-choice-option-text">{choice.text}</label>
                </div>
              );
            })}
          </div>
        );
      })}

      <input id="solver-submit" className="solver-submit" type="button" value="Submit" onClick={onClickSubmit}></input>
      <input id="solver-back" className="solver-back" type="button" value="Back" onClick={onClickBack}></input>
    </form>
  );
};

export default SurveySolver;
