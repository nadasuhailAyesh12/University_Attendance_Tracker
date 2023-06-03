const { join } = require("path");

const pgPromise = require("pg-promise")({})
const { QueryFile } = require("pg-promise");

let db = require("./Connection");
const { development_URI } = require("../../config/enviroment").database

const dropDatabase = async () => {
    const fullPath = join(__dirname, "DropDatabase.sql");
    await db.any(new QueryFile(fullPath, { minify: true }));
    console.log("database droped successfully")
};
const createDatabase = async () => {
    const fullPath = join(__dirname, "createDatabase.sql");
    await db.any(new QueryFile(fullPath, { minify: true }));
    console.log("database created successfully")
    db.$pool.end
};

const createTables = async () => {
    db = pgPromise(development_URI)
    const fullPath = join(__dirname, "createTables.sql");
    await db.any(new QueryFile(fullPath, { minify: true }));
    console.log("tables created successfully")
};
const seedData = async () => {
    const fullPath = join(__dirname, "fakeData.sql");
    await db.any(new QueryFile(fullPath, { minify: true }));
    console.log("data inserted  successfully")
};

dropDatabase().then(() => createDatabase()).then(() => createTables())
    .then(() => seedData()).catch((err) => console.log(err))



