const { PreparedStatement } = require("pg-promise");
const db = require("../seeding/Connection");

const addLecture = async (lecture_id, sec_id, course_id, semester, year, room_number, building, start_time, end_time, day) => {
    const insertQuery = new PreparedStatement({
        name: 'insertLecture',
        text: 'insert into lecture values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        values: [lecture_id, sec_id, course_id, semester, year, day, start_time, end_time, room_number, building]
    })
    await db.none(insertQuery);
}

const getLectures = async (dept_name, course_id) => {
    const getQuery = new PreparedStatement({
        name: 'loadLecture',
        text: 'select lecture_id,sec_id,room_number,building,day,start_time,end_time from lecture natural join course where dept_name ilike $1 and course_id ilike $2',
        values: [dept_name, course_id]
    })
    const lectures = await db.any(getQuery);
    return lectures;
}

const searchLecture = async (course_id, dept_name, building, room_number, sec_id) => {
    const getSearchQuery = new PreparedStatement({
        name: 'searchLecture',
        text: 'select lecture_id,sec_id,room_number,building,day,start_time,end_time from lecture natural join course where course_id ilike $1 and dept_name ilike $2 and building ilike $3 and room_number=$4 and sec_id=$5',
        values: [course_id, dept_name, building, room_number, sec_id]
    })
    const lecture = await db.one(getSearchQuery);
    return lecture;
}

const updateLecture = async (sec_id, course_id, room_number, buiding, start_time, end_time, day, id, oldCourse_id, oldSection_id, lecture_id) => {
    const updateQuery = new PreparedStatement({
        name: 'updateLecture',
        text: 'update lecture set sec_id=$1,course_id=$2,room_number=$3,building=$4,start_time=$5,end_time=$6,day=$7,lecture_id=$11 where lecture_id=$8 and course_id=$9 and sec_id=$10',
        values: [sec_id, course_id, room_number, buiding, start_time, end_time, day, id, oldCourse_id, oldSection_id, lecture_id]
    })
    await db.none(updateQuery);
}

const deleteLecture = async (sec_id, course_id, id) => {
    const deleteQuery = new PreparedStatement({
        name: 'deleteLecture',
        text: 'delete from  lecture where lecture_id=$1 and course_id=$2 and sec_id=$3',
        values: [id, course_id, sec_id]
    })
    await db.none(deleteQuery);
}


const lectureRepository = { addLecture, getLectures, searchLecture, updateLecture, deleteLecture };
module.exports = lectureRepository;