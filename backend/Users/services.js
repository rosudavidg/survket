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
    let res = await query(
      "INSERT INTO users (role_id, email, password, first_name, last_name, gender, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [role_id, email, hashedPassword, first_name, last_name, gender, date_of_birth]
    );

    if (role == "user_solver") {
      await query("INSERT INTO solver_users (id, coins) VALUES ($1, 0)", [res[0].id]);
    }

    return res;
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
    "SELECT u.password, r.role, u.id, u.activated FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = $1",
    [email]
  );

  if (queryResult.length == 0) {
    throw new ServerError(`Utilizatorul cu emailul ${email} nu exista in sistem!`, 400);
  }

  const storedPassword = queryResult[0].password;
  const userRole = queryResult[0].role;
  const userId = queryResult[0].id;
  const activated = queryResult[0].activated;

  if (!(await compare(password, storedPassword))) {
    throw new ServerError(`Parola pentru emailul ${email} este gresita!`, 403);
  }

  if (!activated) {
    throw new ServerError("This account is not activated!\nPlease check your email!", 400);
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

  let userCoins = 99999;

  if (userRole === "admin") {
    userCoins = 9999999;
  } else if (userRole === "user_creator") {
    userCoins = (
      await query("SELECT coins FROM users JOIN creator_users ON users.id = creator_users.id WHERE users.id = $1", [
        userId,
      ])
    )[0].coins;
  } else if (userRole === "user_solver") {
    userCoins = (
      await query("SELECT coins FROM users JOIN solver_users ON users.id = solver_users.id WHERE users.id = $1", [
        userId,
      ])
    )[0].coins;
  }

  return { name: res.first_name + " " + res.last_name, coins: userCoins };
};

const insertToken = async (userId, token) => {
  await query("INSERT INTO confirmations (user_id, token) VALUES ($1, $2)", [userId, token]);
};

const activate = async (token) => {
  let r = await query("SELECT user_id FROM confirmations WHERE token = $1", [token]);

  if (r.length === 0) {
    throw new ServerError("Invalid token!", 400);
  }

  const userId = r[0].user_id;

  await query("UPDATE users SET activated = TRUE WHERE id = $1", [userId]);
  await query("DELETE from confirmations WHERE user_id = $1", [userId]);

  return true;
};

module.exports = {
  getAll,
  createUser,
  authenticate,
  AddCompany,
  getMe,
  insertToken,
  activate,
};
