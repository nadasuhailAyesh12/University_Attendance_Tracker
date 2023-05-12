const AuthController = require("../Controllers/AuthController");

const AuthRouter = require("express").Router();

AuthRouter.post("/signup", AuthController.register);

module.exports = AuthRouter;