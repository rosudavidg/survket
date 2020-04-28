const Router = require("express")();

const UsersController = require("../Users/controller.js");
const SurveysController = require("../Surveys/controller.js");
const QuestionsController = require("../Questions/controller.js");

Router.use("/users", UsersController);
Router.use("/surveys", SurveysController);
Router.use("/questions", QuestionsController);

module.exports = Router;
