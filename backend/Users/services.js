const query = require("../database");

const getAll = async () => {
  console.log(process.env.DATABASE_URL);
  return await query("SELECT * FROM users");
};

module.exports = {
  getAll
};
