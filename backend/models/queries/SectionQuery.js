const { PreparedStatement } = require("pg-promise")
const db = require("../seeding/Connection")

const insertSection = async (sec_id, course_id, semester, year, ID) => {
    const insertQuery = new PreparedStatement({ name: 'section', text: 'insert into section values($1,$2,$3,$4,$5)' })
    await db.none(insertQuery, [sec_id, course_id, semester, year, ID]);
}

const getSectionsRelatedtoCourse = async (id) => {
    const getQuery = new PreparedStatement({
        name: 'section', text:
            'select sec_id,course_id,building,room_number,day,start_time,end_time from section natural join lecture where course_id=$1'
    })
    const sections = await db.any(getQuery, [id]);
    return sections;
}

const sectionRepository = { insertSection, getSectionsRelatedtoCourse }
module.exports = sectionRepository;


