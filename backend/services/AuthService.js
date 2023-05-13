const AuthHelper = require("../helpers/AuthHelper");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");
const AuthRepository = require("../repositories/AuthRepository");
const userRepository = require("../repositories/UserRepository");


const register = async (ID, name, password, role) => {
    if (password) {
        password = await AuthHelper.hashPassword(password);
        await AuthRepository.register(ID, name, password, role)
        const user = await userRepository.getUserByID(ID);
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
        const [token, tokenCookieOptions] = await AuthHelper.generateToken(
            user
        );

        return { user, token, tokenCookieOptions };
    }

    else if (!(await AuthHelper.comparePassword(password, loginUserPassword))) {
        throw new ErrorHandler("invalid login credentials", 401);
    }
};

const AuthService = { register, login }
module.exports = AuthService;