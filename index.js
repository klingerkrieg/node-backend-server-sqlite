//baseado em: https://www.bezkoder.com/node-js-jwt-authentication-mysql/

const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const seeder = require("./seeders");

db.database.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  seeder.initial(db);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require('./routes/auth.routes')(app);
require('./routes/produto.routes')(app);