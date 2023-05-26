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

const lectureRepository = { addLecture };
module.exports = lectureRepository;