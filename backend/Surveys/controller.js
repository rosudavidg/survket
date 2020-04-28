const express = require("express");
const SurveysService = require("./services.js");
const { validateFields } = require("../utils");
const { authorizeAndExtractToken } = require("../security/JWT/index.js");
const router = express.Router();
const { authorizeRoles } = require("../Security/Roles/index.js");

router.get(
  "/",
  authorizeAndExtractToken,
  authorizeRoles("user_solver", "user_creator", "admin", "support"),
  async (req, res, next) => {
    let { userId, userRole } = req.state.decoded;
    let surveys = undefined;

    try {
      if (userRole == "user_creator") surveys = await SurveysService.getAll(userId);
      else surveys = await SurveysService.getAllAsSolver(userId);

      res.status(200).json(surveys);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", authorizeAndExtractToken, authorizeRoles("user_creator"), async (req, res, next) => {
  let { name, reward, surveys_texts, surveys_choices } = req.body;
  let userId = req.state.decoded.userId;

  try {
    validateFields({
      name: {
        value: name,
        type: "ascii",
      },
      reward: {
        value: reward,
        type: "int",
      },
      surveys_texts: {
        value: surveys_texts,
        type: "array",
      },
      surveys_choices: {
        value: surveys_choices,
        type: "array",
      },
    });

    for (let i = 0; i < surveys_texts.length; i++) {
      validateFields({
        question: {
          value: surveys_texts[i].question,
          type: "ascii",
        },
      });
    }

    for (let i = 0; i < surveys_choices.length; i++) {
      validateFields({
        question: {
          value: surveys_choices[i].question,
          type: "ascii",
        },
        surveys_choices_elements: {
          value: surveys_choices[i].surveys_choices_elements,
          type: "array",
        },
      });

      let elements = surveys_choices[i].surveys_choices_elements;

      for (let j = 0; j < elements.length; j++) {
        validateFields({
          text: {
            value: elements[j].text,
            type: "ascii",
          },
        });
      }
    }

    await SurveysService.create(userId, name, reward, surveys_texts, surveys_choices);

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  authorizeAndExtractToken,
  authorizeRoles("user_solver", "user_creator", "admin", "support"),
  async (req, res, next) => {
    let { userId, roleId } = req.state.decoded;
    let surveyId = req.params.id;
    let surveys = undefined;

    try {
      if (roleId == "user_creator") surveys = await SurveysService.getById(userId, surveyId);
      else surveys = await SurveysService.getByIdAsSolver(surveyId);

      res.status(200).json(surveys);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/:id/solve", authorizeAndExtractToken, authorizeRoles("user_solver"), async (req, res, next) => {
  let { userId } = req.state.decoded;
  let surveyId = req.params.id;
  let { surveys_texts, surveys_choices } = req.body;

  try {
    validateFields({
      surveys_texts: {
        value: surveys_texts,
        type: "array",
      },
      surveys_choices: {
        value: surveys_choices,
        type: "array",
      },
    });

    for (let i = 0; i < surveys_texts.length; i++) {
      validateFields({
        id: {
          value: surveys_texts[i].id,
          type: "int",
        },
        answer: {
          value: surveys_texts[i].answer,
          type: "ascii",
        },
      });
    }

    for (let i = 0; i < surveys_choices.length; i++) {
      validateFields({
        id: {
          value: surveys_choices[i].id,
          type: "int",
        },
        survey_choice_element_id: {
          value: surveys_choices[i].survey_choice_element_id,
          type: "int",
        },
      });
    }

    await SurveysService.solve(surveyId, userId, surveys_texts, surveys_choices);

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/stats", authorizeAndExtractToken, authorizeRoles("user_creator"), async (req, res, next) => {
  let { userId } = req.state.decoded;
  let surveyId = req.params.id;

  try {
    let stats = await SurveysService.getStats(userId, surveyId);
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
