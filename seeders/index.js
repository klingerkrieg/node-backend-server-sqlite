var bcrypt = require("bcryptjs");

exports.initial = (db) => {
    db.usuario.create({
      id: 1,
      email: "admin@gmail.com",
      senha:bcrypt.hashSync('123456', 8)
    });
}