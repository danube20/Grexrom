require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);
require('./config/session.config')(app)

// ROUTES
app.use("/", require("./routes/artworks.routes"))

app.use('/', require('./routes/auth.routes'))


require("./error-handling")(app);

module.exports = app;
