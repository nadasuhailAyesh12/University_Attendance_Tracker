const { PreparedStatement } = require("pg-promise");
const db = require("../seeding/Connection");

const addLecture = async (sec_id, course_id, semester, year, room_number, buiding, start_time, end_time, day) => {
    const insertQuery = new PreparedStatement({
        name: 'lecture',
        text: 'insert into lecture (sec_id,course_id,semester,year,room_number,building,start_time,end_time,day)values($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        values: [sec_id, course_id, semester, year, room_number, buiding, start_time, end_time, day]
    })
    await db.none(insertQuery);
}

const getLectures = async (dept_name, course_id) => {
    const getQuery = new PreparedStatement({
        name: 'lecture',
        text: 'select lecture_id,sec_id,room_number,building,day,start_time,end_time from lecture natural join course where dept_name ilike $1 and course_id ilike $2',
        values: [dept_name, course_id]
    })
    const lectures = await db.any(getQuery);
    return lectures;
}

const searchLecture = async (course_id, dept_name, building, room_number, sec_id) => {
    const getQuery = new PreparedStatement({
        name: 'lecture',
        text: 'select lecture_id,sec_id,room_number,building,day,start_time,end_time from lecture natural join course where course_id ilike $1 and dept_name ilike $2 and building ilike $3 and room_number=$4 and sec_id=$5',
        values: [course_id, dept_name, building, room_number, sec_id]
    })
    const lecture = await db.one(getQuery);
    return lecture;
}


const lectureRepository = { addLecture, getLectures, searchLecture };
module.exports = lectureRepository;