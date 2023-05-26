const AuthHelper = require("../helpers/AuthHelper");
const AuthRepository = require("../models/queries/AuthQuery.js");
const ErrorHandler = require("../helpers/ErrorHandlerHelper")

const register = async (ID, name, password) => {
    if (password) {
        password = await AuthHelper.hashPassword(password);
        await AuthRepository.register(ID, name, password);
        const user = await AuthRepository.getUserByID(ID);
        const [token, tokenCookieOptions] = await AuthHelper.generateToken(user);
        return { user, token, tokenCookieOptions };
    }
};

const login = async (ID, password) => {

    if (!ID || !password) {
        throw new ErrorHandler('Please enter email & password', 400)
    }

    const user = await AuthRepository.login(ID);
    const loginUserPassword = await AuthRepository.getLoginUserPassword(ID);


    if (
        user &&
        (await AuthHelper.comparePassword(password, loginUserPassword))
    ) {
        const [token] = await AuthHelper.generateToken(
            user
        );

        return { user, token };
    }

    else if (!(await AuthHelper.comparePassword(password, loginUserPassword))) {
        throw new ErrorHandler("invalid login credentials", 401);
    }
};

const AuthService = { register, login };
module.exports = AuthService;