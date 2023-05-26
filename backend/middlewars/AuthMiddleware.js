const AuthHelper = require("../helpers/AuthHelper");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const AuthRepository = require("../models/queries/AuthQuery");

const isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;

    // if (!token) {
    //     return next(new ErrorHandler("'Login first to access this resource.", 401))
    // }

    // const decoded = await AuthHelper.verifyToken(token)
    // const { id } = decoded;
    // req.user = await AuthRepository.getUserByID(id)

    next();
}

module.exports = isAuthenticatedUser
