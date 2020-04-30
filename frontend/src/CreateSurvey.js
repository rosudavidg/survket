import React, { useState, useEffect } from "react";
import "./CreateSurvey.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const NewTextComponent = (props) => {
  return (
    <div className="create-text-component" onClick={props.onClickFunction}>
      <div className="create-text-component-group">
        <FontAwesomeIcon icon={faPlusCircle} color="beige" />
        <div className="create-text-component-text">Add Text Question</div>
      </div>
    </div>
  );
};

const NewChoiceComponent = (props) => {
  return (
    <div className="create-choice-component" onClick={props.onClickFunction}>
      <div className="create-choice-component-group">
        <FontAwesomeIcon icon={faPlusCircle} color="beige" />
        <div className="create-choice-component-text">Add Choice Question</div>
      </div>
    </div>
  );
};

const AddChoiceComponent = (props) => {
  return (
    <div className="create-choice-component" onClick={props.onClickFunction}>
      <div className="create-choice-component-group">
        <FontAwesomeIcon icon={faPlusCircle} color="beige" />
        <div className="create-choice-component-text">Add Choice</div>
      </div>
    </div>
  );
};

const TextComponent = (props) => {
  return (
    <div key={props.index} className="create-text">
      <label className="create-text-title">Question</label>
      <input
        className="create-text-input"
        type="text"
        value={props.initialValue}
        onChange={(event) => props.updateFunction(event, props.index)}
      />
      <div className="create-delete-container" onClick={props.deleteFunction}>
        <FontAwesomeIcon icon={faTrashAlt} color="beige" />
        <div className="create-text-component-text">Delete Text Question</div>
      </div>
    </div>
  );
};

const ChoiceComponent = (props) => {
  const surveysChoices = props.surveysChoices;
  const setSurveysChoices = props.setSurveysChoices;

  const onUpdateChoiceComponent = (event, index) => {
    const copy = JSON.parse(JSON.stringify(surveysChoices));
    copy[index].question = event.target.value;
    setSurveysChoices(copy);
  };

  const onClickAddNewChoice = () => {
    const copy = JSON.parse(JSON.stringify(surveysChoices));
    copy[props.index].choices.push("");
    setSurveysChoices(copy);
  };

  const onDeleteChoice = (index) => {
    const copy = JSON.parse(JSON.stringify(surveysChoices));
    copy[props.index].choices.splice(index, 1);
    setSurveysChoices(copy);
  };

  const onUpdateChoice = (event, index) => {
    const copy = JSON.parse(JSON.stringify(surveysChoices));
    copy[props.index].choices[index] = event.target.value;
    setSurveysChoices(copy);
  };

  return (
    <div key={props.index} className="create-text">
      <label className="create-text-title">Question</label>
      <input
        className="create-text-input"
        type="text"
        value={props.initialValue}
        onChange={(event) => onUpdateChoiceComponent(event, props.index)}
      />
      {surveysChoices[props.index].choices.map((choice, index) => {
        return (
          <>
            <label key={`question-${props.index}choice-${index}`} className="create-text-title">
              Choice #{index + 1}
            </label>
            <input
              className="create-text-input"
              type="text"
              value={choice}
              onChange={(event) => onUpdateChoice(event, index)}
            />
            <div className="create-delete-container-choice" onClick={(ev) => onDeleteChoice(index)}>
              <FontAwesomeIcon icon={faTrashAlt} color="beige" />
              <div className="create-text-component-text-choice">Delete Choice #{index + 1}</div>
            </div>
          </>
        );
      })}
      <div className="create-add-choice-container" onClick={onClickAddNewChoice}>
        <FontAwesomeIcon icon={faPlusCircle} color="beige" />
        <div className="create-text-component-text">Add choice</div>
      </div>
      <div className="create-delete-container" onClick={props.deleteFunction}>
        <FontAwesomeIcon icon={faTrashAlt} color="beige" />
        <div className="create-text-component-text">Delete Choice Question</div>
      </div>
    </div>
  );
};

const CreateSurvey = () => {
  const [name, setName] = useState("");
  const [reward, setReward] = useState(0);
  const [surveysTexts, setSurveysTexts] = useState([]);
  const [surveysChoices, setSurveysChoices] = useState([]);

  const history = useHistory();

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeReward = (event) => {
    setReward(event.target.value);
  };

  const onClickNewTextComponent = () => {
    const copy = JSON.parse(JSON.stringify(surveysTexts));
    copy.push("");
    setSurveysTexts(copy);
  };

  const onClickNewChoiceComponent = () => {
    const copy = JSON.parse(JSON.stringify(surveysChoices));
    copy.push({ question: "", choices: ["", ""] });
    setSurveysChoices(copy);
  };

  const onClickDeleteTextComponent = (index) => {
    const copy = JSON.parse(JSON.stringify(surveysTexts));
    copy.splice(index, 1);
    setSurveysTexts(copy);
  };

  const onClickDeleteChoiceComponent = (index) => {
    const copy = JSON.parse(JSON.stringify(surveysChoices));
    copy.splice(index, 1);
    setSurveysChoices(copy);
  };

  const onUpdateTextComponent = (event, index) => {
    const copy = JSON.parse(JSON.stringify(surveysTexts));
    copy[index] = event.target.value;
    setSurveysTexts(copy);
  };

  const onClickBack = () => {
    history.goBack();
  };

  const onClickSubmit = async () => {
    const jwt_token = localStorage.getItem("token");

    const surveys_texts = surveysTexts.map((e) => {
      return { question: e };
    });

    const surveys_choices = surveysChoices.map((e) => {
      return {
        question: e.question,
        surveys_choices_elements: e.choices.map((c) => {
          return {
            text: c,
          };
        }),
      };
    });

    try {
      await axios.post(
        `http://192.168.100.6:8888/surveys/`,
        {
          name,
          reward,
          surveys_texts,
          surveys_choices,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );
      history.push("/");
      alert("Successfully created!");
    } catch (e) {
      alert(`Error: ${e.response.data.error}`);
    }
  };

  useEffect(() => {
    console.log(surveysChoices);
  });

  return (
    <form className="create-container">
      <div className="create-title">
        <label className="create-title-title">Title</label>
        <input className="create-title-input" type="text" onChange={onChangeName} />
      </div>
      <div className="create-reward">
        <label className="create-reward-title">Reward</label>
        <input className="create-reward-input" type="text" onChange={onChangeReward} />
      </div>
      {surveysTexts.map((surveyText, index) => {
        return (
          <TextComponent
            index={index}
            initialValue={surveyText}
            deleteFunction={() => onClickDeleteTextComponent(index)}
            updateFunction={onUpdateTextComponent}
          />
        );
      })}
      <NewTextComponent onClickFunction={onClickNewTextComponent} />
      {surveysChoices.map((surveyChoice, index) => {
        return (
          <ChoiceComponent
            index={index}
            initialValue={surveyChoice.question}
            deleteFunction={() => onClickDeleteChoiceComponent(index)}
            setSurveysChoices={setSurveysChoices}
            surveysChoices={surveysChoices}
          />
        );
      })}
      <NewChoiceComponent onClickFunction={onClickNewChoiceComponent} />
      <input className="create-submit" type="button" value="Create survey" onClick={onClickSubmit}></input>
      <input className="create-back" type="button" value="Back" onClick={onClickBack}></input>
    </form>
  );
};

export default CreateSurvey;
