const express = require("express");
const UsersService = require("./services.js");
const { validateFields, sendConfirmationLink } = require("../utils");
const { authorizeAndExtractToken } = require("../security/JWT/index.js");
const router = express.Router();
const { authorizeRoles } = require("../Security/Roles/index.js");
const { ServerError } = require("../errors");

router.get(
  "/",
  authorizeAndExtractToken,
  authorizeRoles("admin", "support"),
  async (req, res, next) => {
    try {
      const users = await UsersService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  authorizeAndExtractToken,
  authorizeRoles("admin", "support"),
  async (req, res, next) => {
    let { role_id } = req.body;

    try {
      if (role_id === undefined) {
        throw new ServerError("Field role_id is not defined.", 400);
      }

      await register(res, req, next, role_id);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/register", async (req, res, next) => {
  let { role_id, company_name } = req.body;
  try {
    if (role_id === undefined)
      throw new ServerError("Field role_id is not defined!", 400);

    if (![3, 4].includes(role_id))
      throw new ServerError(
        `Cannot create user with role_id = ${role_id}!`,
        400
      );

    if (role_id == 4 && company_name === undefined)
      throw new ServerError("Field company_name is not defined!", 400);

    let userId = await register(res, req, next, role_id);

    if (role_id == 4) await UsersService.AddCompany(userId, company_name);

    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  let { email, password } = req.body;

  try {
    validateFields({
      email: {
        value: email,
        type: "email"
      },
      password: {
        value: password,
        type: "password"
      }
    });

    const token = await UsersService.authenticate(email, password);

    res.status(200).json(token);
  } catch (err) {
    next(err);
  }
});

register = async (res, req, next, role_id) => {
  let {
    first_name,
    last_name,
    email,
    password,
    date_of_birth,
    gender
  } = req.body;

  try {
    validateFields({
      first_name: {
        value: first_name,
        type: "alpha"
      },
      last_name: {
        value: last_name,
        type: "alpha"
      },
      role_id: {
        value: role_id,
        type: "int"
      },
      date_of_birth: {
        value: date_of_birth,
        type: "date"
      },
      email: {
        value: email,
        type: "email"
      },
      password: {
        value: password,
        type: "password"
      }
    });

    if (gender !== undefined) {
      validateFields({
        gender: {
          value: gender,
          type: "gender"
        }
      });
    }

    gender = gender || null;

    let rows = await UsersService.createUser(
      role_id,
      email,
      password,
      first_name,
      last_name,
      gender,
      date_of_birth
    );

    // TODO: Generate confirmation token

    // TODO: Insert token into database/confirmations

    await sendConfirmationLink(email, "token");

    return rows[0].id;
  } catch (err) {
    next(err);
  }
};

module.exports = router;
