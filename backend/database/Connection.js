const pgPromise = require("pg-promise")({})

const { uri } = require("../config/enviroment").database;

const db = pgPromise(uri);

module.exports = db;
