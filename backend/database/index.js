const { Pool } = require("pg");
const fs = require("fs");

const pool = new Pool({
  user: fs.readFileSync(process.env.DATABASE_USER, "utf8"),
  host: process.env.DATABASE_HOST,
  database: fs.readFileSync(process.env.DATABASE_NAME, "utf8"),
  password: fs.readFileSync(process.env.DATABASE_PASSWORD, "utf8"),
  port: process.env.DATABASE_PORT,
  // ssl: true,
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500,
});

const query = async (text, params) => {
  const { rows } = await pool.query(text, params);
  return rows;
};

module.exports = query;
