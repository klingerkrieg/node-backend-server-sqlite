const config = require("../config/db.js");
const Sequelize = require("sequelize");

const database = new Sequelize({
    dialect: config.dialect,
    storage: config.storage
});

const db = {};
db.Sequelize = Sequelize;
db.database = database;

db.usuario = require("../models/usuario.js")(database, Sequelize);
db.produto = require("../models/produto.js")(database, Sequelize);

module.exports = db;

