const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Usuario = db.Usuario;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};


verifyUser = (req, res, next) => {
  Usuario.findByPk(req.userId).then(user => {
    console.log(user);
    next();
    return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  verifyUser: verifyUser,
};
module.exports = authJwt;