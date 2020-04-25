import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyList from "./SurveyList.js";
import "./Home.css";

const Home = () => {
  const [surveys, setSurveys] = useState([]);

  const getSurveys = async () => {
    const jwt_token = localStorage.getItem("token");

    let res;
    try {
      res = await axios.get("http://192.168.100.6:8888/surveys", {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      });
      setSurveys(res.data);
    } catch (e) {
      alert("Get surveys failed.");
    }
  };

  useEffect(() => {
    getSurveys();
    // setSurveys([{ title: "Uleiul perfect", reward: 100, creator: "Auchan" }]);
  }, []);

  return (
    <div className="home">
      <SurveyList surveys={surveys} />
    </div>
  );
};

export default Home;
