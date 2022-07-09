const { authJwt  } = require("../middleware");
const controller = require("../controllers/produto.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  app.get("/produtos",[authJwt.verifyToken],controller.getAll);
  app.get("/produtos/:id",[authJwt.verifyToken ],controller.getOne);
  app.put("/produtos",[authJwt.verifyToken ], controller.update);
  app.post("/produtos",[authJwt.verifyToken ],controller.create);
  app.delete("/produtos",[authJwt.verifyToken ], controller.delete);
};