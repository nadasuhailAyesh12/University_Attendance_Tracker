const { PreparedStatement } = require("pg-promise");
const db = require("../seeding/Connection");
PreparedStatement
const getdepartments = async () => {
    const getQuery = new PreparedStatement({ name: 'get department query', text: 'select * from department' })
    const departments = await db.any(getQuery);
    return departments;
}

const departmentRepository = { getdepartments }
module.exports = departmentRepository;


