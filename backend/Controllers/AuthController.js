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

const AuthController = { register }
module.exports = AuthController