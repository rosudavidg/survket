const query = require("../database");
const { ServerError } = require("../errors");

const getCreateSurveyCost = async () => {
  const res = await query("SELECT * FROM configurations WHERE config_name=$1", ["create_survey_cost"]);

  return res[0].config_value;
};

const updateCreateSurveyCost = async (value) => {
  await query("UPDATE configurations SET config_value = $2 WHERE config_name=$1", ["create_survey_cost", value]);
};

module.exports = { getCreateSurveyCost, updateCreateSurveyCost };
