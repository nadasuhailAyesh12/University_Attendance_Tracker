const AuthHelper = require("../helpers/AuthHelper");
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

const AuthService = { register }
module.exports = AuthService;