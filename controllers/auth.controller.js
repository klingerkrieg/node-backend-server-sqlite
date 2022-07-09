const db = require("../models");
const config = require("../config/auth.config");
const Usuario = db.usuario;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.registrar = (req, res) => {
  // Save User to Database
  Usuario.create({
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 8)
    })
    .then(user => {
        res.send({error:0, message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({error:1, message: err.message });
    });
};


exports.login = (req, res) => {
    
    Usuario.findOne({
        where: {
          email: req.body.email,
        }
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({error:1, message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.senha,
          user.senha
        );
        if (!passwordIsValid) {
            return res.status(404).send({error:0, success:0, message: "User Not found." });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        
        res.status(200).send({
            error:0, 
            id: user.id,
            email: user.email,
            accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({error:1, message: err.message });
    });
};