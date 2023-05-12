const { PreparedStatement } = require('pg-promise');

const db = require('../database/Connection');
const ErrorHandler = require('../helpers/ErrorHandlerHelper');


const register = async (ID, name, password, role) => {
    const addUserQuery = new PreparedStatement({ name: 'register', text: 'INSERT INTO users(ID,name, password,role) VALUES($1, $2,$3,$4)' })
    addUserQuery.values = [ID, name, password, role]
    await db.any(addUserQuery)
}

const getLoginUserPassword = async (ID) => {
    try {
        const checkPasswordQuery = new PreparedStatement({ name: "checkPassword", text: "select password from users where ID=$1" })
        checkPasswordQuery.values = [ID]
        const { password } = (await db.one(checkPasswordQuery));
        return password
    }
    catch (error) {
        return error;
    }
}

const login = async (ID) => {
    const loginUserQuery = new PreparedStatement({ name: "login", text: "select ID,name,role from users where ID=$1" })
    loginUserQuery.values = [ID]
    const user = await db.one(loginUserQuery)
    if (!user) {
        throw new ErrorHandler("user not found", 400)
    }
    return user
}


const AuthRepository = { register, login, getLoginUserPassword };
module.exports = AuthRepository;