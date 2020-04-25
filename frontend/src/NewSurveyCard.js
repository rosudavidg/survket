import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./NewSurveyCard.css";

const Survey = (props) => {
  return (
    <div className="new-survey">
      <div className="new-survey-title">Title</div>
      <div className="new-survey-reward">
        <div className="survey-reward-coins">
          <FontAwesomeIcon icon={faCoins} color="rgb(160, 139, 20)" />
        </div>
        <div className="survey-reward-value">Reward</div>
      </div>
      <div className="new-survey-solve">Create new survey!</div>
      <div className="new-survey-creator">Created by you </div>
    </div>
  );
};

export default Survey;
