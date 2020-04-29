const express = require("express");
const router = express.Router();
const QuestionsService = require("./services.js");
const { validateFields, sendContactAnswer } = require("../utils");
const { authorizeAndExtractToken } = require("../security/JWT/index.js");
const { authorizeRoles } = require("../Security/Roles/index.js");

router.get("/", authorizeAndExtractToken, authorizeRoles("admin", "support"), async (req, res, next) => {
  try {
    const not_answered = await QuestionsService.getNotAnswered();
    const answered = await QuestionsService.getAnswered();

    res.status(200).json({ not_answered, answered });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/answer", authorizeAndExtractToken, authorizeRoles("admin", "support"), async (req, res, next) => {
  try {
    let id = req.params.id;
    let { answer } = req.body;

    validateFields({
      answer: {
        value: answer,
        type: "ascii",
      },
      id: {
        value: id,
        type: "int",
      },
    });

    await QuestionsService.answerQuestion(id, answer);

    let { email, message } = await QuestionsService.get(id);

    sendContactAnswer(email, message, answer);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/setfaq", authorizeAndExtractToken, authorizeRoles("admin", "support"), async (req, res, next) => {
  let id = req.params.id;
  try {
    await QuestionsService.setFAQ(id, true);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/unsetfaq", authorizeAndExtractToken, authorizeRoles("admin", "support"), async (req, res, next) => {
  let id = req.params.id;
  try {
    await QuestionsService.setFAQ(id, false);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get("/faq", async (req, res, next) => {
  try {
    const faqs = await QuestionsService.getFAQ();
    res.status(200).json(faqs);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  let { email, subject, message } = req.body;

  try {
    validateFields({
      email: {
        value: email,
        type: "email",
      },
      subject: {
        value: subject,
        type: "ascii",
      },
      message: {
        value: message,
        type: "ascii",
      },
    });

    await QuestionsService.create(email, subject, message);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
