const Router = require("express")();

const UsersController = require("../Users/controller.js");
const SurveysController = require("../Surveys/controller.js");

Router.use("/users", UsersController);
Router.use("/surveys", SurveysController);

module.exports = Router;
