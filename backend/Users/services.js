const query = require("../database");

const getAll = async () => {
  return await query("SELECT * FROM users");
};

module.exports = {
  getAll
};
