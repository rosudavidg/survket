const query = require("../database");
const { ServerError } = require("../errors");

const create = async (email, subject, message) => {
  await query("INSERT INTO questions (email, subject, message) VALUES ($1, $2, $3)", [email, subject, message]);
};

const getNotAnswered = async () => {
  return await query("SELECT * FROM questions WHERE answered = FALSE");
};

const getAnswered = async () => {
  return await query("SELECT * FROM questions WHERE answered = TRUE");
};

const answerQuestion = async (id, answer) => {
  await query("UPDATE questions SET answered = TRUE, ANSWER = $1 WHERE id = $2", [answer, id]);
};

const setFAQ = async (id, is_faq) => {
  await query("UPDATE questions SET is_faq = $1 WHERE id = $2", [is_faq, id]);
};

const getFAQ = async () => {
  return await query("SELECT message, answer FROM questions WHERE is_faq = TRUE");
};

module.exports = { create, getNotAnswered, getAnswered, answerQuestion, setFAQ, getFAQ };
