const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const colors = require("colors");
const cowsay = require("cowsay");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./client/"));

const apiRoutes = require("./routes/api-routes");
app.use(apiRoutes);

const clientRoutes = require("./routes/client-routes");
app.use(clientRoutes);

app.listen(PORT, () =>
  console.log(
    cowsay.say({
      text: "\nListening: ".bold + `http://localhost:${PORT}\n`.rainbow,
      e: "><", // cow eyes
      T: "U ", // cow tongue
    })
  )
);
