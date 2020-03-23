const query = require("../database");

const create = async (userId, name, reward, surveys_texts, surveys_choices) => {
  let rows = await query(
    "INSERT INTO surveys (creator, name, reward) VALUES ($1, $2, $3) RETURNING *",
    [userId, name, reward]
  );

  let surveyId = rows[0].id;
};

const getAll = async () => {
  let surveys = await query("SELECT * FROM surveys");

  for (let i = 0; i < surveys.length; i++) {
    let survey = surveys[i];
    let surveys_text = await query(
      "SELECT * FROM surveys_texts WHERE id = $1",
      [survey.id]
    );
  }

  return surveys;
};

module.exports = { create, getAll };
