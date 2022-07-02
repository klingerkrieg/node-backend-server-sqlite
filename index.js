//banco
const db = require('./db');
const Produto = require('./produto');

(async () => { 
    try {
        const resultado = await db.sync();
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
const basicAuth = require('express-basic-auth');
 
//autenticacao
app.use(basicAuth({
    users: { admin: '123456' },
    challenge: true 
}))

app.listen(3001, ()=>{
    console.log("running on 3001");
})


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//HELLO
app.get('/', (req, res) => {
    res.send('Hello from the users server')
});

//GET ALL
app.get('/users', (req, res) => {
    (async () => {
        try{
            const produtos = await Produto.findAll();
            console.log(produtos)
            res.json({ error:false, data:produtos});
        } catch (error) {
            console.log(error);
            res.send({ error: true, message: error });
        }
    })()
});


//GET ONE
app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    (async () => {
        try{
            const produto = await Produto.findByPk(id);
            res.json({ error:false, data:produto});
        } catch (error) {
            console.log(error);
            res.send({ error: true, message: error });
        }
    })()
});

//CREATE
app.post('/users/', (req, res) => {
    let nome = req.body.nome;
    let preco = req.body.preco;
    let descricao = req.body.descricao;

    (async () => {
        try {
            const resultado = db.sync();
            
            const resultadoCreate = Produto.create({
                nome: nome,
                preco: preco,
                descricao: descricao
            })
            
            res.send({ error: false, message: 'user has been added successfully.' });
        } catch (error) {
            console.log(error);
            res.send({ error: true, message: error });
        }
    })()
});

//UPDATE
app.put('/users/', (req, res) => {
    let id = req.body.id;
    let nome = req.body.nome;
    let preco = req.body.preco;
    let descricao = req.body.descricao;


    (async () => {
        try{
            const produto = await Produto.findByPk(id);
            produto.nome = nome;
            produto.preco = preco;
            produto.descricao = descricao;

            const resultadoSave = await produto.save();
            res.send({ error: false, message: 'user has been saved successfully.' });
        } catch (error) {
            console.log(error);
            res.send({ error: true, message: error });
        }
    })();
});

//DELETE
app.delete('/users/', (req, res) => {
    let id = req.body.id;
    (async () => {
        try{
            Produto.destroy({ where: { id: id }});
            res.send({ error: false, message: 'user has been deleted successfully.' });
        } catch (error) {
            console.log(error);
            res.send({ error: true, message: error });
        }
    })();
});
