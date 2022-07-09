const db = require("../models");
const Produto = db.produto;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

//GET ALL
exports.getAll = (req, res) => {
    
    //Exemplo com then
    try{
        const produtos = Produto.findAll()
        .then(produtos => {
            console.log("GET ALL:" + produtos.length );
            res.json({ error:false, data:produtos});
        });
    } catch (error) {
        console.log(error);
        res.send({ error: true, message: error });
    }
    
};



//GET ONE
exports.getOne = (req, res) => {
    let id = req.params.id;
    
    //Exemplo com await
    (async () => {
        try{
            const produto = await Produto.findByPk(id);
            console.log("GET ONE:" + produto );
            res.json({ error:false, data:produto});
        } catch (error) {
            console.log(error);
            res.send({ error: true, message: error });
        }
    })()
};

//CREATE
exports.create = (req, res) => {
    let nome = req.body.nome;
    let preco = req.body.preco;
    let descricao = req.body.descricao;
    let foto = "";

    console.log(req.files);
    if(req.files){
        foto = req.files.foto.name;
        req.files.foto.mv("./uploads/"+ foto);
    }

    //Exemplo com then
    try {
        const resultadoCreate = Produto.create({
            nome: nome,
            preco: preco,
            descricao: descricao,
            foto: foto,
            dono: req.userId,
        }).then(() => 
            res.send({ error: false, message: 'data has been added successfully.' }
        ));
        
    } catch (error) {
        console.log(error);
        res.send({ error: true, message: error });
    }
    
};

//UPDATE
exports.update = (req, res) => {
    let id = req.body.id;
    let nome = req.body.nome;
    let preco = req.body.preco;
    let descricao = req.body.descricao;
    let foto = "";

    if (id == null){
        res.send({ error: true, message: "Id vazia" });
    }

    console.log(req.files);
    if(req.files){
        foto = req.files.foto.name;
        req.files.foto.mv("./uploads/"+ foto);
    }

    //Exemplo com await
    (async () => {
        try{
            const produto = await Produto.findByPk(id);
            if (nome != ""){
                produto.nome = nome;
            }
            if (preco != ""){
                produto.preco = preco;
            }
            if (descricao != ""){
                produto.descricao = descricao;
            }
            if (foto != ""){
                produto.foto = foto;
            }

            const resultadoSave = await produto.save();
            res.send({ error: false, message: 'data has been saved successfully.' });
        } catch (error) {
            console.log(error);
            res.send({ error: true, message: error });
        }
    })();
};

//DELETE
exports.delete = (req, res) => {
    let id = req.body.id;
    //Exemplo com await
    (async () => {
        try{
            Produto.destroy({ where: { id: id }});
            res.send({ error: false, message: 'data has been deleted successfully.' });
        } catch (error) {
            console.log(error);
            res.send({ error: true, message: error });
        }
    })();
};