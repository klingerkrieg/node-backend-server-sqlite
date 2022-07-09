const db = require("../models");
const Usuario = db.usuario;

checkDuplicateEmail = (req, res, next) => {
    // Email
    Usuario.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          error:1,
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
};


const verifyRegister = {
    checkDuplicateEmail: checkDuplicateEmail,
};
module.exports = verifyRegister;