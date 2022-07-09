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
          return res.status(404).send({error:1,accessToken: "", message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.senha,
          user.senha
        );
        if (!passwordIsValid) {
            return res.status(404).send({error:1,accessToken: "", message: "User Not found." });
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
        res.status(500).send({error:1,accessToken: "", message: err.message });
    });
};


exports.logout = (req, res) => {
    //para deslogar tem que tirar o token do navegador
    //ou adicionar o token em uma blocklist
    //na pratica este metodo nao está fazendo nada
    res.status(200).send({
        error:0, 
        accessToken: ""
    });
};