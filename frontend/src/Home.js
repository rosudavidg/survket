import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyList from "./SurveyList.js";
import "./Home.css";

const Home = (props) => {
  const [surveys, setSurveys] = useState([]);

  const getSurveys = async () => {
    const jwt_token = localStorage.getItem("token");

    let res;
    try {
      res = await axios.get("/surveys", {
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
  }, []);

  return (
    <div className="home">
      <SurveyList surveys={surveys} me={props.me} />
    </div>
  );
};

export default Home;
