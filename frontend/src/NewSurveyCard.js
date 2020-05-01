import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./NewSurveyCard.css";

const getCreateNewSurveyCost = async (setFunc) => {
  try {
    const jwt_token = localStorage.getItem("token");
    const cost = await axios.get(`http://192.168.100.6:8888/configurations/create-survey-cost`, {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    setFunc(cost.data);
  } catch (err) {
    alert(err.response.message);
  }
};

const Survey = (props) => {
  const history = useHistory();

  const onClickCreate = () => {
    console.log(props);
    console.log(createNewSurveyCost);
    if (props.me.coins < createNewSurveyCost) {
      alert("insufficient coins.");
    } else {
      history.push("/create");
    }
  };
  const [createNewSurveyCost, setCreateNewSurveyCost] = useState(0);

  useEffect(() => {
    getCreateNewSurveyCost(setCreateNewSurveyCost);
  }, []);

  return (
    <div className="new-survey">
      <div className="new-survey-title">Title</div>
      <div className="new-survey-reward">
        <div className="survey-reward-coins">
          <FontAwesomeIcon icon={faCoins} color="rgb(160, 139, 20)" />
        </div>
        <div className="survey-reward-value">Reward</div>
      </div>
      <div className="new-survey-solve" onClick={onClickCreate}>
        Create new survey for {createNewSurveyCost} coins!
      </div>
      <div className="new-survey-creator">Created by you </div>
    </div>
  );
};

export default Survey;
