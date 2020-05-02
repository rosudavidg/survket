import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./SurveyStats.css";

const SurveyStats = (props) => {
  const history = useHistory();
  const [stats, setStats] = useState({ surveys_texts_stats: [], surveys_choices_stats: [] });

  const getSurvey = async () => {
    const jwt_token = localStorage.getItem("token");
    let res;
    try {
      res = await axios.get(`/surveys/${props.match.params.id}/stats`, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      });
      setStats(res.data);
    } catch (e) {
      alert("Get stats failed.");
    }
  };

  const onClickBack = () => {
    history.push("/");
  };

  useEffect(() => {
    getSurvey();
  }, []);

  return (
    <div className="stats-survey">
      {stats.surveys_texts_stats.map((e) => {
        return (
          <div key={e.id} className="stats-survey-text">
            <div className="stats-survey-text-question">{e.question}</div>
            <ul className="stats-survey-text-list">
              {e.answers.length === 0 && <div style={{ color: "green" }}>No answers yet!</div>}
              {e.answers.map((ans) => {
                return (
                  <div key={`ans-${e.answers.indexOf(ans)}`} className="stats-survey-text-answer">
                    {ans}
                  </div>
                );
              })}
            </ul>
          </div>
        );
      })}

      {stats.surveys_choices_stats.map((e) => {
        return (
          <div key={e.id} className="stats-survey-choice">
            <div className="stats-survey-text-question">
              {e.question}
              <table className="stats-survey-choice-table">
                <thead>
                  <tr>
                    <th>Choice</th>
                    <th>Hits</th>
                  </tr>
                </thead>
                <tbody>
                  {e.answers.map((c) => {
                    return (
                      <tr key={c.id}>
                        <td>{c.text}</td>
                        <td>{c.count}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <input id="stats-back" className="stats-back" type="button" value="Back" onClick={onClickBack}></input>
    </div>
  );
};

export default SurveyStats;
