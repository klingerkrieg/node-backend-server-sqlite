const { authJwt  } =require("../middleware");
const controller = require("../controllers/produto.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  app.get("/produtos",[authJwt.verifyToken],controller.allAccess);
  /*app.get("/produtos/:id",[authJwt ],controller.getOne);
  app.put("/produtos",[authJwt ], controller.update);
  app.post("/produtos",[authJwt ],controller.create);
  app.delete("/produtos",[authJwt ], controller.delete);*/
};