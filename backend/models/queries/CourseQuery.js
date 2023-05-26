const { PreparedStatement } = require("pg-promise")
const db = require("../seeding/Connection")

const addCourse = async (id, title, dept_name, book) => {
    const insertQuery = new PreparedStatement({ name: 'add course query', text: 'insert into course values ($1,$2,$3,$4)' })
    await db.none(insertQuery, [id, title, dept_name, book]);
}

const getCourses = async () => {
    const getQuery = new PreparedStatement({ name: 'get courses query', text: 'select * from course' })
    const courses = await db.any(getQuery);
    return courses;
}

const courseRepository = { addCourse, getCourses };
module.exports = courseRepository;
