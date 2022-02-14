require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

// ROUTES
app.use("/", require("./routes/index.routes"))

require("./error-handling")(app);

module.exports = app;
