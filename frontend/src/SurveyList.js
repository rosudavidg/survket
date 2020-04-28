import React from "react";
import { getUserRole } from "./Auth.js";
import Survey from "./Survey";
import NewSurveyCard from "./NewSurveyCard";
import "./SurveyList.css";

const setNewSurveyCardIsVisible = () => {
  const userRole = getUserRole(localStorage.getItem("token"));

  switch (userRole) {
    case "user_creator":
    case "admin":
    case "support":
      return true;
    case "user_solver":
      return false;
    default:
      return false;
  }
};

const SurveyList = (props) => {
  const newSurveyCardIsVisible = setNewSurveyCardIsVisible();

  return (
    <div className="survey-list">
      {newSurveyCardIsVisible && <NewSurveyCard />}
      {!newSurveyCardIsVisible && props.surveys.length === 0 && <div>No surveys for you 😕</div>}
      {props.surveys.map((survey) => {
        return (
          <Survey key={survey.id} title={survey.name} creator={survey.creator} reward={survey.reward} id={survey.id} />
        );
      })}
    </div>
  );
};

export default SurveyList;
