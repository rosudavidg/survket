const express = require("express");

const UsersService = require("./services.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await UsersService.getAll();
  res.json(users);
});

module.exports = router;
