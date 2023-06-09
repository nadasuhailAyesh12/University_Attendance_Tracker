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

const updateCourse = async (oldID, title, dept_name, book, course_id) => {
    const updateQuery = new PreparedStatement({
        name: 'courseupdate', text: "update course set course_id=$5,title=$2,dept_name=$3,book=$4 where course_id =$1"
    })
    updateQuery.values = [oldID, title, dept_name, book, course_id];
    await db.none(updateQuery);
}

const deleteCourse = async (id) => {
    const deleteQuery = new PreparedStatement({
        name: 'coursedelete', text: "delete from course where course_id =$1"
    })
    deleteQuery.values = [id];
    await db.none(deleteQuery);
}

const searchCourse = async (title) => {
    const searchQuery = new PreparedStatement({
        name: 'courseSearch', text: 'SELECT * FROM course WHERE title ILIKE $1'
    })
    searchQuery.values = [`%${title}%`]
    const courses = await db.any(searchQuery);
    return courses;
}

const courseRepository = { addCourse, getCourses, updateCourse, deleteCourse, searchCourse };
module.exports = courseRepository;
