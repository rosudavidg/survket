const query = require("../database");
const { hash, compare } = require("../security/Password/index.js");
const { ServerError } = require("../errors");
const { generateToken } = require("../security/JWT/index.js");

const getAll = async () => {
  return await query(
    "SELECT id, role_id, activated, email, first_name, last_name, gender, date_of_birth, timestamp_created FROM users"
  );
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

const authenticate = async (email, password) => {
  const queryResult = await query(
    "SELECT u.password, r.role, u.id FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = $1",
    [email]
  );

  if (queryResult.length == 0) {
    throw new ServerError(
      `Utilizatorul cu emailul ${email} nu exista in sistem!`,
      400
    );
  }

  const storedPassword = queryResult[0].password;
  const userRole = queryResult[0].role;
  const userId = queryResult[0].id;

  if (!(await compare(password, storedPassword))) {
    throw new ServerError(`Parola pentru emailul ${email} este gresita!`, 403);
  }

  const payload = { userEmail: email, userRole, userId };

  const token = await generateToken(payload);
  return token;
};

module.exports = {
  getAll,
  createUser,
  authenticate
};
