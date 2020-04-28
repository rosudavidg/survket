import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { getUserRole } from "./Auth.js";
import "./Survey.css";

const Survey = (props) => {
  const history = useHistory();
  const [canViewResults, setCanViewResults] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canSolve, setCanSolve] = useState(false);

  useEffect(() => {
    const role = getUserRole(localStorage.getItem("token"));

    if (role === "user_solver") {
      setCanSolve(true);
    } else if (role === "user_creator") {
      setCanDelete(true);
      setCanViewResults(true);
    } else if (role === "support") {
      setCanDelete(true);
    } else if (role === "admin") {
      setCanDelete(true);
    }
  }, []);

  const onClickSolve = () => {
    history.push(`/solve/${props.id}`);
  };

  const onClickResults = () => {
    history.push(`/stats/${props.id}`);
  };

  return (
    <div className="survey">
      <div className="survey-title">{props.title}</div>
      <div className="survey-reward">
        <div className="survey-reward-coins">
          <FontAwesomeIcon icon={faCoins} color="rgb(160, 139, 20)" />
        </div>
        <div className="survey-reward-value">{props.reward}</div>
      </div>
      {canSolve && (
        <div className="survey-solve" onClick={onClickSolve}>
          Complete survey!
        </div>
      )}
      {canViewResults && (
        <div className="survey-results" onClick={onClickResults}>
          View results
        </div>
      )}
      {canDelete && <div className="survey-delete">Delete survey</div>}
      <div className="survey-creator">Created for you by {props.creator}</div>
    </div>
  );
};

export default Survey;
