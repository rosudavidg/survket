const query = require("../database");
const { hash, compare } = require("../security/Password/index.js");
const { ServerError } = require("../errors");
const { generateToken } = require("../security/JWT/index.js");

const getAll = async () => {
  return await query(
    "SELECT id, role_id, activated, email, first_name, last_name, gender, date_of_birth, timestamp_created FROM users"
  );
};

const createUser = async (role, email, password, first_name, last_name, gender, date_of_birth) => {
  const hashedPassword = await hash(password);
  let role_id = 0;

  switch (role) {
    case "admin":
      role_id = 1;
      break;
    case "support":
      role_id = 2;
      break;
    case "user_solver":
      role_id = 3;
      break;
    case "user_creator":
      role_id = 4;
      break;
  }

  try {
    return await query(
      "INSERT INTO users (role_id, email, password, first_name, last_name, gender, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [role_id, email, hashedPassword, first_name, last_name, gender, date_of_birth]
    );
  } catch (e) {
    if (e.message.includes("users_email_key")) {
      throw new ServerError("Email is already registered!", 400);
    } else {
      throw new ServerError("Database error.", 500);
    }
  }
};

const authenticate = async (email, password) => {
  const queryResult = await query(
    "SELECT u.password, r.role, u.id FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = $1",
    [email]
  );

  if (queryResult.length == 0) {
    throw new ServerError(`Utilizatorul cu emailul ${email} nu exista in sistem!`, 400);
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

const AddCompany = async (userId, companyName) => {
  await query("INSERT INTO creator_users (id, company_name) VALUES ($1, $2)", [userId, companyName]);
};

const getMe = async (userId, userRole) => {
  const res = (await query("SELECT first_name, last_name FROM users WHERE id = $1", [userId]))[0];

  return { name: res.first_name + " " + res.last_name, coins: 100 };
};

module.exports = {
  getAll,
  createUser,
  authenticate,
  AddCompany,
  getMe,
};
