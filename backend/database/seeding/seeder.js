const { join } = require("path");
const { QueryFile } = require("pg-promise");

const db = require("../Connection");

const seedData = async () => {
    const fullPath = join(__dirname, "init.sql");
    await db.any(new QueryFile(fullPath, { minify: true }));
};

seedData();

module.exports = seedData;


