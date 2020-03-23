const express = require("express");
const SurveysService = require("./services.js");
const { validateFields } = require("../utils");
const { authorizeAndExtractToken } = require("../security/JWT/index.js");
const router = express.Router();
const { authorizeRoles } = require("../Security/Roles/index.js");

router.get(
  "/",
  authorizeAndExtractToken,
  authorizeRoles("user_creator"),
  async (req, res, next) => {
    let userId = req.state.decoded.userId;

    let surveys = await SurveysService.getAll(userId);

    res.status(200).json(surveys);
  }
);

router.post(
  "/",
  authorizeAndExtractToken,
  authorizeRoles("user_creator"),
  async (req, res, next) => {
    let { name, reward, surveys_texts, surveys_choices } = req.body;
    let userId = req.state.decoded.userId;

    try {
      validateFields({
        name: {
          value: name,
          type: "ascii"
        },
        reward: {
          value: reward,
          type: "int"
        },
        surveys_texts: {
          value: surveys_texts,
          type: "array"
        },
        surveys_choices: {
          value: surveys_choices,
          type: "array"
        }
      });

      for (let i = 0; i < surveys_texts.length; i++) {
        validateFields({
          question: {
            value: surveys_texts[i].question,
            type: "ascii"
          }
        });
      }

      for (let i = 0; i < surveys_choices.length; i++) {
        validateFields({
          question: {
            value: surveys_choices[i].question,
            type: "ascii"
          },
          surveys_choices_elements: {
            value: surveys_choices[i].surveys_choices_elements,
            type: "array"
          }
        });

        let elements = surveys_choices[i].surveys_choices_elements;

        for (let j = 0; j < elements.length; j++) {
          validateFields({
            text: {
              value: elements[j].text,
              type: "ascii"
            }
          });
        }
      }

      await SurveysService.create(
        userId,
        name,
        reward,
        surveys_texts,
        surveys_choices
      );

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
