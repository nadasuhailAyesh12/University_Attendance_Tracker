const AuthController = require("../Controllers/AuthController");
const isAuthenticatedUser = require("../middlewars/AuthMiddleware");

const AuthRouter = require("express").Router();

AuthRouter.post("/signup", AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.get("/logout", AuthController.logout);
AuthRouter.get("/verify", isAuthenticatedUser, AuthController.verify);

module.exports = AuthRouter;