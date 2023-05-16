const AuthService = require("../services/AuthService");

const register = async (req, res, next) => {
    try {
        const { ID, name, password, role } = req.body;
        const { token, user, tokenCookieOptions } = await AuthService.register(ID, name, password, role)
        res.cookie("token", token, tokenCookieOptions);

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
        const { user, token, tokenCookieOptions } = await AuthService.login(
            ID, password
        );

        res.cookie("token", token, tokenCookieOptions);

        res.status(200).json({
            success: true,
            user,
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

const AuthController = { register, login, logout }
module.exports = AuthController