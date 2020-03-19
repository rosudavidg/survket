const express = require("express");
const routes = require("./routes");
const app = express();

const PORT = 5000;
const HOST = "0.0.0.0";

app.use("/", routes);

app.listen(PORT, HOST);
