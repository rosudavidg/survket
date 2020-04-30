const express = require("express");
const router = express.Router();
const ConfigurationsService = require("./services.js");
const { validateFields, sendContactAnswer } = require("../utils");
const { authorizeAndExtractToken } = require("../security/JWT/index.js");
const { authorizeRoles } = require("../Security/Roles/index.js");

router.get("/create-survey-cost", authorizeAndExtractToken, async (req, res, next) => {
  try {
    const value = await ConfigurationsService.getCreateSurveyCost();

    res.status(200).json(Number(value));
  } catch (err) {
    next(err);
  }
});

router.post("/create-survey-cost", authorizeAndExtractToken, authorizeRoles("admin"), async (req, res, next) => {
  try {
    let { value } = req.body;

    validateFields({
      value: {
        value: value,
        type: "int",
      },
    });

    await ConfigurationsService.updateCreateSurveyCost(value);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
