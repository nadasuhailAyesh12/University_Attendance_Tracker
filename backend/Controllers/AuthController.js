const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const AuthService = require("../services/AuthService");
const { expiresTime } = require("../config/enviroment").cookieConfig

const register = async (req, res, next) => {
    try {
        const { ID, name, password } = req.body;
        const { token, user, tokenCookieOptions } = await AuthService.register(ID, name, password)
        res.cookie("token", token);

        res.status(201).json({
            success: true,
            user
        });
    }
    catch (err) {
        return next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { ID, password } = req.body;
        const { user, token } = await AuthService.login(
            ID, password
        );

        res.cookie("token", token).status(200).json({
            success: true,
            user,
            token
        });

    }
    catch (err) {
        return next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            expires: new Date(Date.now() + expiresTime * 24 * 60 * 60 * 1000),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        return next(err);
    }
};

const verify = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return next(new ErrorHandler("'Login first to access this resource.", 401))
        }

        const decoded = await AuthHelper.verifyToken(token)
        const { id } = decoded;
        req.user = await AuthRepository.getUserByID(id)

        res.status(200).json({
            // user: req.user,
            success: true,
            user: req.user
        })
    }
    catch (err) {
        return next(err);
    }
};

const AuthController = { register, login, logout, verify }
module.exports = AuthController