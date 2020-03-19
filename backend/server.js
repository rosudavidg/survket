const express = require("express");
const routes = require("./routes");
const app = express();

const PORT = 5000;
const HOST = "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.use("/", (err, req, res, next) => {
  console.trace(err);
  let status = 500;
  let message = "Something Bad Happened";
  if (err.httpStatus) {
    status = err.httpStatus;
    message = err.message;
  }
  res.status(status).json({
    error: message
  });
});

app.listen(PORT, HOST);
