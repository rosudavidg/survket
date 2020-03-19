const query = require("../database");

const getAll = async () => {
  return await query("SELECT * FROM users");
};

const createUser = async (
  role_id,
  email,
  first_name,
  last_name,
  gender,
  date_of_birth
) => {
  return await query(
    "INSERT INTO users (role_id, email, first_name, last_name, gender, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6)",
    [role_id, email, first_name, last_name, gender, date_of_birth]
  );
};

module.exports = {
  getAll,
  createUser
};
