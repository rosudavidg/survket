const query = require("../database");
const { hash, compare } = require("../security/Password/index.js");

const getAll = async () => {
  return await query("SELECT * FROM users");
};

const createUser = async (
  role_id,
  email,
  password,
  first_name,
  last_name,
  gender,
  date_of_birth
) => {
  const hashedPassword = await hash(password);
  console.log(hashedPassword.length);

  return await query(
    "INSERT INTO users (role_id, email, password, first_name, last_name, gender, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      role_id,
      email,
      hashedPassword,
      first_name,
      last_name,
      gender,
      date_of_birth
    ]
  );
};

module.exports = {
  getAll,
  createUser
};
