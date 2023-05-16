const { PreparedStatement: PS } = require('pg-promise');

const db = require('../database/Connection');

const register = async (ID, name, password, role) => {
    const addUserQuery = new PS({ name: 'register', text: 'INSERT INTO authuser(ID,name, password,role) VALUES($1, $2,$3,$4)' })
    addUserQuery.values = [ID, name, password, role]
    await db.none(addUserQuery)
}

const AuthRepository = { register };
module.exports = AuthRepository;