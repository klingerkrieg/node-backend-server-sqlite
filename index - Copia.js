//banco
const db = require('./db');
const Produto = require('./models/produto');
const Usuario = require('./models/usuario');

(async () => { 
    try {
        const resultado = await db.sync();
        //cria o usuario padrao
        Usuario.initial();
        //console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();

//backend
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
//const basicAuth = require('express-basic-auth');
const fileUpload = require('express-fileupload');

//autenticacao com banco de dados
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

 
//autenticacao simples
/*app.use(basicAuth({
    users: { admin: '123456' },
    challenge: true 
}))*/

// ativa uploads
app.use(fileUpload({
    createParentPath: true
}));
app.use('/uploads',express.static(__dirname+'/uploads'));




app.listen(3001, ()=>{
    console.log("running on 3001");
})


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
