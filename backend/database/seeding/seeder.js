const { join } = require("path");
const { QueryFile } = require("pg-promise");

const db = require("../Connection");

const createDatabase = async () => {
    const fullPath = join(__dirname, "createDatabase.sql");
    await db.any(new QueryFile(fullPath, { minify: true }));
    console.log("database created successfully")
};
const createTables = async () => {
    const fullPath = join(__dirname, "init.sql");
    await db.any(new QueryFile(fullPath, { minify: true }));
    console.log("tables created successfully")
};
const seedData = async () => {
    const fullPath = join(__dirname, "fakeData.sql");
    await db.any(new QueryFile(fullPath, { minify: true }));
    console.log("data inserted  successfully")
};

createDatabase().then(() => createTables()).then(() => seedData)

module.exports = seedData;


