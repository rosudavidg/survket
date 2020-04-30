const Router = require("express")();

const UsersController = require("../Users/controller.js");
const SurveysController = require("../Surveys/controller.js");
const QuestionsController = require("../Questions/controller.js");
const ConfigurationsController = require("../Configurations/controller.js");

Router.use("/users", UsersController);
Router.use("/surveys", SurveysController);
Router.use("/questions", QuestionsController);
Router.use("/configurations", ConfigurationsController);

module.exports = Router;
