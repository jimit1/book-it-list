const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const db = require("./models");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const apiRoutes = require("./routes/api-routes");
app.use(apiRoutes);

const clientRoutes = require("./routes/client-routes");
app.use(clientRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
});
