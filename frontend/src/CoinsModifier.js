import React, { useState, useEffect } from "react";
import "./CoinsModifier.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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

const setCreateNewSurveyCostCall = async (value) => {
  try {
    const jwt_token = localStorage.getItem("token");
    await axios.post(
      `http://192.168.100.6:8888/configurations/create-survey-cost`,
      {
        value,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      }
    );
  } catch (err) {
    alert(err.response.data.error);
  }
};

const CoinsModifier = () => {
  const [createNewSurveyCost, setCreateNewSurveyCost] = useState(0);

  useEffect(() => {
    getCreateNewSurveyCost(setCreateNewSurveyCost);
  }, []);

  const onClickIncrease = () => {
    setCreateNewSurveyCostCall(createNewSurveyCost + 10);
    setCreateNewSurveyCost(createNewSurveyCost + 10);
  };

  const onClickDecrease = () => {
    setCreateNewSurveyCostCall(createNewSurveyCost - 10);
    setCreateNewSurveyCost(createNewSurveyCost - 10);
  };

  return (
    <div className="coins-modifier">
      <div className="coins-modifier-title">Create new survey cost</div>
      <div className="coins-modifier-container">
        <div className="coins-modifier-decrease" onClick={onClickDecrease}>
          <FontAwesomeIcon icon={faMinusCircle} color="rgb(160, 139, 20)" />
        </div>
        <div className="coins-modifier-cost">
          <div className="coins-modifier-coins">
            <FontAwesomeIcon icon={faCoins} color="rgb(160, 139, 20)" />
          </div>
          <div className="coins-modifier-value">{createNewSurveyCost}</div>
        </div>
        <div className="coins-modifier-increase" onClick={onClickIncrease}>
          <FontAwesomeIcon icon={faPlusCircle} color="rgb(160, 139, 20)" />
        </div>
      </div>
    </div>
  );
};

export default CoinsModifier;
