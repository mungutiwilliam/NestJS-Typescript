require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.APP_PORT
var models = require("./models");
const user = require("./routes/user");




models.sequelize
  .sync({ update: true })
  .then(function () {
    console.log("Database OK");
  })
  .catch(function (err) {
    console.log(err, `${err}`);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/user", user)



app.post("/", (req, res) => {
    res.json({ message: "Server is up and running!" });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

