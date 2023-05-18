const AuthController = require("../Controllers/AuthController");

const AuthRouter = require("express").Router();

AuthRouter.post("/signup", AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.get("/logout", AuthController.logout);


module.exports = AuthRouter;