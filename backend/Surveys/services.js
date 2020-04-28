const query = require("../database");
const { ServerError } = require("../errors");

const create = async (userId, name, reward, surveys_texts, surveys_choices) => {
  // Insert into surveys
  let rows = await query("INSERT INTO surveys (creator, name, reward) VALUES ($1, $2, $3) RETURNING *", [
    userId,
    name,
    reward,
  ]);

  let surveyId = rows[0].id;

  // Insert into surveys_texts
  for (let i = 0; i < surveys_texts.length; i++) {
    await query("INSERT INTO surveys_texts (survey_id, question) VALUES ($1, $2)", [
      surveyId,
      surveys_texts[i].question,
    ]);
  }

  // Insert into surveys_choices
  for (let i = 0; i < surveys_choices.length; i++) {
    let rows = await query("INSERT INTO surveys_choices (survey_id, question) VALUES ($1, $2) RETURNING *", [
      surveyId,
      surveys_choices[i].question,
    ]);
    let survey_choice_id = rows[0].id;

    let survey_choice_elements = surveys_choices[i].surveys_choices_elements;

    // Insert into surveys_choices_elements
    for (let j = 0; j < survey_choice_elements.length; j++) {
      await query("INSERT INTO surveys_choices_elements (survey_choice_id, text) VALUES ($1, $2)", [
        survey_choice_id,
        surveys_choices[i].surveys_choices_elements[j].text,
      ]);
    }
  }
};

const getAll = async (userId) => {
  // Get surveys
  let surveys = await query("SELECT * FROM surveys WHERE creator = $1", [userId]);

  for (let i = 0; i < surveys.length; i++) {
    let survey = surveys[i];

    // Get surveys_texts
    let surveys_text = await query("SELECT id, question FROM surveys_texts WHERE survey_id = $1", [survey.id]);

    // Replace creator id with company name
    const company_name = (await query("SELECT company_name FROM creator_users WHERE id = $1", [survey["creator"]]))[0][
      "company_name"
    ];

    survey["creator"] = company_name;
    survey["surveys_texts"] = surveys_text;

    // Get surveys_choices
    let surveys_choices = await query("SELECT * FROM surveys_choices WHERE survey_id = $1", [survey.id]);

    survey["surveys_choices"] = [];

    // Get surveys_choices_elements
    for (let j = 0; j < surveys_choices.length; j++) {
      let surveys_choices_elements = await query(
        "SELECT id, text FROM surveys_choices_elements WHERE survey_choice_id = $1",
        [surveys_choices[j].id]
      );
      survey["surveys_choices"].push({
        question: surveys_choices[j].question,
        surveys_choices_elements,
      });
    }
  }

  return surveys;
};

const getAllAsSolver = async (userId) => {
  // Get surveys
  let surveys = await query("SELECT * FROM surveys");
  let solved_surveys = await query("SELECT survey_id FROM solved_surveys WHERE user_id = $1", [userId]);

  const solved_ids = solved_surveys.map((e) => e.survey_id);

  surveys = surveys.filter((e) => !solved_ids.includes(e.id));

  for (let i = 0; i < surveys.length; i++) {
    let survey = surveys[i];

    // Get surveys_texts
    let surveys_text = await query("SELECT id, question FROM surveys_texts WHERE survey_id = $1", [survey.id]);

    // Replace creator id with company name
    const company_name = (await query("SELECT company_name FROM creator_users WHERE id = $1", [survey["creator"]]))[0][
      "company_name"
    ];

    survey["creator"] = company_name;

    survey["surveys_texts"] = surveys_text;

    // Get surveys_choices
    let surveys_choices = await query("SELECT * FROM surveys_choices WHERE survey_id = $1", [survey.id]);

    survey["surveys_choices"] = [];

    // Get surveys_choices_elements
    for (let j = 0; j < surveys_choices.length; j++) {
      let surveys_choices_elements = await query(
        "SELECT id, text FROM surveys_choices_elements WHERE survey_choice_id = $1",
        [surveys_choices[j].id]
      );
      survey["surveys_choices"].push({
        question: surveys_choices[j].question,
        surveys_choices_elements,
      });
    }
  }

  return surveys;
};

const getById = async (userId, surveyId) => {
  // Get surveys
  let surveys = await query("SELECT * FROM surveys WHERE creator = $1 and id = $2", [userId, surveyId]);

  if (surveys.length != 1) throw new ServerError(`Survey ${surveyId} not found.`, 400);

  for (let i = 0; i < surveys.length; i++) {
    let survey = surveys[i];

    // Get surveys_texts
    let surveys_text = await query("SELECT id, question FROM surveys_texts WHERE survey_id = $1", [survey.id]);

    survey["surveys_texts"] = surveys_text;

    // Get surveys_choices
    let surveys_choices = await query("SELECT * FROM surveys_choices WHERE survey_id = $1", [survey.id]);

    survey["surveys_choices"] = [];

    // Get surveys_choices_elements
    for (let j = 0; j < surveys_choices.length; j++) {
      let surveys_choices_elements = await query(
        "SELECT id, text FROM surveys_choices_elements WHERE survey_choice_id = $1",
        [surveys_choices[j].id]
      );
      survey["surveys_choices"].push({
        id: surveys_choices[j].id,
        question: surveys_choices[j].question,
        surveys_choices_elements,
      });
    }
  }

  return surveys[0];
};

const getByIdAsSolver = async (surveyId) => {
  // Get surveys
  let surveys = await query("SELECT * FROM surveys WHERE id = $1", [surveyId]);

  if (surveys.length != 1) throw new ServerError(`Survey ${surveyId} not found.`, 400);

  for (let i = 0; i < surveys.length; i++) {
    let survey = surveys[i];

    // Get surveys_texts
    let surveys_text = await query("SELECT id, question FROM surveys_texts WHERE survey_id = $1", [survey.id]);

    survey["surveys_texts"] = surveys_text;

    // Get surveys_choices
    let surveys_choices = await query("SELECT * FROM surveys_choices WHERE survey_id = $1", [survey.id]);

    survey["surveys_choices"] = [];

    // Get surveys_choices_elements
    for (let j = 0; j < surveys_choices.length; j++) {
      let surveys_choices_elements = await query(
        "SELECT id, text FROM surveys_choices_elements WHERE survey_choice_id = $1",
        [surveys_choices[j].id]
      );
      survey["surveys_choices"].push({
        id: surveys_choices[j].id,
        question: surveys_choices[j].question,
        surveys_choices_elements,
      });
    }
  }

  return surveys[0];
};

let solve = async (surveyId, userId, surveys_text, surveys_choices) => {
  let rows = undefined;
  try {
    await query("BEGIN");

    rows = await query("INSERT INTO solved_surveys (survey_id, user_id) VALUES ($1, $2) RETURNING *", [
      surveyId,
      userId,
    ]);

    solved_survey_id = rows[0].id;

    for (let i = 0; i < surveys_text.length; i++) {
      await query("INSERT INTO solved_surveys_texts (solved_survey_id, survey_text_id, answer) VALUES ($1, $2, $3)", [
        solved_survey_id,
        surveys_text[i].id,
        surveys_text[i].answer,
      ]);
    }

    for (let i = 0; i < surveys_choices.length; i++) {
      await query(
        "INSERT INTO solved_surveys_choices (solved_survey_id, survey_choice_id, survey_choice_element_id) VALUES ($1, $2, $3)",
        [solved_survey_id, surveys_choices[i].id, surveys_choices[i].survey_choice_element_id]
      );
    }
    await query("COMMIT");
  } catch (err) {
    await query("ROLLBACK");
    throw new ServerError("Save failed.", 500);
  }
};

let getStats = async (userId, surveyId) => {
  let rows = await query("SELECT * FROM surveys WHERE id = $1 AND creator = $2", [surveyId, userId]);

  let survey = rows[0];

  let surveys_texts = await query("SELECT id, question FROM surveys_texts WHERE survey_id = $1", [surveyId]);

  let surveys_choices = await query("SELECT id, question FROM surveys_choices WHERE survey_id = $1", [surveyId]);

  let solved_surveys_ids = await query("SELECT id FROM solved_surveys WHERE survey_id = $1", [surveyId]);

  let surveys_texts_stats = [];

  for (let i = 0; i < surveys_texts.length; i++) {
    let survey_text = surveys_texts[i];
    let survey_text_stats = {
      id: survey_text.id,
      question: survey_text.question,
    };

    let answers = [];

    for (let j = 0; j < solved_surveys_ids.length; j++) {
      rows = await query(
        "SELECT answer FROM solved_surveys_texts WHERE solved_survey_id = $1 AND survey_text_id = $2",
        [solved_surveys_ids[j].id, survey_text.id]
      );
      if (rows.length != 0) {
        answers.push(rows[0].answer);
      }
    }

    survey_text_stats.answers = answers;

    surveys_texts_stats.push(survey_text_stats);
  }

  let surveys_choices_stats = [];

  for (let i = 0; i < surveys_choices.length; i++) {
    let survey_choice = surveys_choices[i];
    let survey_choice_stats = {
      id: survey_choice.id,
      question: survey_choice.question,
    };

    let survey_choice_elements = await query(
      "SELECT id, text FROM surveys_choices_elements WHERE survey_choice_id = $1",
      [survey_choice.id]
    );

    let answers = [];

    for (let j = 0; j < survey_choice_elements.length; j++) {
      let answer = {
        id: survey_choice_elements[j].id,
        text: survey_choice_elements[j].text,
      };

      let count = await query(
        "SELECT COUNT(*) FROM solved_surveys_choices WHERE survey_choice_id = $1 AND survey_choice_element_id = $2",
        [survey_choice.id, survey_choice_elements[j].id]
      );

      answer.count = Number(count[0].count);

      answers.push(answer);
    }

    survey_choice_stats.answers = answers;

    surveys_choices_stats.push(survey_choice_stats);
  }

  survey.surveys_texts_stats = surveys_texts_stats;
  survey.surveys_choices_stats = surveys_choices_stats;

  return survey;
};

module.exports = {
  create,
  getAll,
  getById,
  getAllAsSolver,
  getByIdAsSolver,
  solve,
  getStats,
};
