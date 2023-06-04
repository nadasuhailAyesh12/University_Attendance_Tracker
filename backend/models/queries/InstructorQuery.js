const { PreparedStatement } = require("pg-promise");
const db = require("../seeding/Connection");

const addInstructor = async (id, name, dept_name, role) => {
    const insertQuery = new PreparedStatement({ name: 'instructor', text: 'insert into instructor values ($1,$2,$3,$4)' })
    await db.none(insertQuery, [id, name, dept_name, role]);
}

const updateInstructor = async (oldID, name, dept_name, role, ID) => {
    const updateQuery = new PreparedStatement({
        name: 'instructorUpdate', text: "update instructor set ID=$5,name=$2,dept_name=$3,role=$4 where ID=$1"
    })
    updateQuery.values = [oldID, name, dept_name, role, ID];
    await db.none(updateQuery);
}

const deleteInstructor = async (id) => {
    const deleteQuery = new PreparedStatement({
        name: 'instructorDelete', text: "delete from instructor where ID=$1"
    })
    deleteQuery.values = [id];
    await db.none(deleteQuery);
}

const searchInstructor = async (name) => {
    const searchQuery = new PreparedStatement({
        name: 'instructorSearch', text: 'SELECT * FROM instructor WHERE name ILIKE $1 '
    })
    searchQuery.values = [`%${name}%`]
    const instructors = await db.any(searchQuery);
    return instructors;
}

const getInstructors = async () => {
    const getQuery = new PreparedStatement({ name: 'get courses query', text: 'select * from instructor' })
    const instructors = await db.any(getQuery);
    return instructors;
}

const instructorRepository = { addInstructor, updateInstructor, deleteInstructor, updateInstructor, searchInstructor, getInstructors }
module.exports = instructorRepository