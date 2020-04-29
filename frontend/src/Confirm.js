import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Confirm.css";

const Confirm = (props) => {
  const history = useHistory();

  const activate = () => {
    const token = props.match.params.token;

    axios
      .post(`http://localhost:8888/users/confirm/${token}`, {})
      .then((res) => {
        alert("Successfully activated!");
        history.push("/login");
      })
      .catch((err) => {
        history.push("/");
        alert(err.response.data.error);
      });
  };

  activate();

  return <></>;
};

export default Confirm;
