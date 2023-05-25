const { PreparedStatement } = require('pg-promise');

const db = require('../seeding/Connection');

const register = async (ID, name, password) => {
    const addUserQuery = new PreparedStatement({ name: 'register', text: 'INSERT INTO authuser(ID,name, password) VALUES($1, $2,$3)' })
    addUserQuery.values = [ID, name, password]
    await db.none(addUserQuery)
}

const getLoginUserPassword = async (ID) => {
    try {
        const checkPasswordQuery = new PreparedStatement({ name: "checkPassword", text: "select password from authuser where ID=$1" })
        checkPasswordQuery.values = [ID]
        const { password } = (await db.one(checkPasswordQuery));
        return password
    }
    catch (error) {
        return error;
    }
}

const login = async (ID) => {
    const loginUserQuery = new PreparedStatement({ name: "login", text: "select ID,name,role from authuser where ID=$1" })
    loginUserQuery.values = [ID]
    const user = await db.one(loginUserQuery)
    if (!user) {
        throw new ErrorHandler("user not found", 400)
    }
    return user
}

const getUserByID = async (ID) => {
    const getUserByIDQuery = new PreparedStatement({ name: 'getUserByID', text: "select ID,name,role from authuser where ID= $1", values: [ID] });
    const user = await db.one(getUserByIDQuery);
    return user;
}

const AuthRepository = { register, getLoginUserPassword, login, getUserByID };
module.exports = AuthRepository;