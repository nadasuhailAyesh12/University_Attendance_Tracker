const { PreparedStatement } = require("pg-promise");
const db = require("../seeding/Connection");

const getNumberOfAttendance = async (course_id, sec_id) => {
    const getNumofAttendance = new PreparedStatement({
        name: "numofAttendance",
        text: `select lecture_id ,count(*)from attendance
    where course_id=$1 and sec_id=$2
    group by lecture_id`,
        values: [course_id, sec_id]
    })
    const data = await db.any(getNumofAttendance);
    return data
}

const getMostattendedLectures = async (course_id, sec_id) => {
    const getMostattendedLectures = new PreparedStatement({
        name: "mostattendedlectures",
        text: `select lecture_id ,count(*) as count from attendance
    where course_id=$1 and sec_id=$2
    group by lecture_id
    order by count desc
    limit 10`,
        values: [course_id, sec_id]
    })
    const lectures = await db.any(getMostattendedLectures);
    return lectures;
}

const getAttendanceRatio = async (course_id, sec_id, lecture_id) => {
    const getAttendanceRatio = new PreparedStatement({
        name: "AttendanceRatio",
        text: `select COUNT(*)*100  / (SELECT COUNT(*) FROM  takes where course_id=$1 and sec_id=$2 ) as ratio
 from attendance  
 where course_id=$1 and sec_id=$2 and lecture_id=$3`,
        values: [course_id, sec_id, lecture_id]
    })
    const { ratio } = await db.one(getAttendanceRatio);
    return ratio
}
const getLecturesThatHaveAbscentRatioMoreThanAttendanceRatio = async (course_id, sec_id) => {
    const getLecturesThatHaveMoreAbscent = new PreparedStatement({
        name: ' getLecturesThatHaveMoreAbscent',
        text: `SELECT lecture_id 
FROM attendance 
where course_id =$1 and sec_id =$2
 group by lecture_id
 HAVING(COUNT(*)*100  ) / (SELECT COUNT(*) FROM  takes where course_id=$1 and sec_id=$2)<50`,
        values: [course_id, sec_id]
    })
    const lectures = await db.any(getLecturesThatHaveMoreAbscent)
    return lectures;
}
const getLecturesThatTheStudentattendmorethan8o0percentmiss = async (course_id, sec_id) => {
    const getLectureQuery = new PreparedStatement({
        name: 'getLecturesThatTheStudentattendmorethan8o0percentmissQuery',
        text: ` select lecture_id,id from lecture cross join student where lecture_id not in (select lecture_id from attendance where id in (SELECT student.ID from student natural join takes
 where ID  not in(select attendance.ID FROM attendance 
    WHERE course_id =$1 and sec_id=$2
    GROUP BY attendance.ID
HAVING(COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id = $1 and sec_id =$2) < 80))) and id in (SELECT student.ID from student natural join takes
 where ID  not in (select attendance.ID FROM attendance 
    WHERE course_id = $1 and sec_id = $2
    GROUP BY attendance.ID
    HAVING(COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id =$1 and sec_id =$2) < 80))`,
        values: [course_id, sec_id]
    })
    const lectures = await db.any(getLectureQuery)
    return lectures;
}

const addLecture = async (lecture_id, sec_id, course_id, semester, year, room_number, building, start_time, end_time, day) => {
    const insertQuery = new PreparedStatement({
        name: 'insertLecture',
        text: 'insert into  lecture values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        values: [lecture_id, sec_id, course_id, semester, year, day, start_time, end_time, room_number, building]
    })
    await db.none(insertQuery);
}

const addLectureForSection = async (sec_id, course_id, semester, year, room_number, building, start_time, end_time, day) => {
    const insertQuery = new PreparedStatement({
        name: 'insertLectureforSection',
        text: 'insert into  lecture (sec_id, course_id, semester, year, day, start_time, end_time, room_number, building)values($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        values: [sec_id, course_id, semester, year, day, start_time, end_time, room_number, building]
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

const searchLecture = async (course_id, dept_name, building, room_number, sec_id, lecture_id) => {
    const getSearchQuery = new PreparedStatement({
        name: 'searchLecture',
        text: 'select lecture_id,sec_id,room_number,building,day,start_time,end_time from lecture natural join course where course_id ilike $1 and dept_name ilike $2 and building ilike $3 and room_number=$4 and sec_id=$5 and lecture_id=$6',
        values: [course_id, dept_name, building, room_number, sec_id, lecture_id]
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

const getSpecificLecture = async (course_id, sec_id, lecture_id) => {
    const getSpecificLectureQuery = new PreparedStatement({
        name: 'getSpecificLecture',
        text: 'select lecture_id,sec_id,room_number,building,day,start_time,end_time from lecture natural join course where course_id ilike $1 and lecture_id=$3 and sec_id=$2',
        values: [course_id, sec_id, lecture_id]
    })
    const lecture = await db.one(getSpecificLectureQuery);
    return lecture;
}


const lectureRepository = { addLecture, getLectures, searchLecture, updateLecture, deleteLecture, getNumberOfAttendance, getAttendanceRatio, getLecturesThatHaveAbscentRatioMoreThanAttendanceRatio, getSpecificLecture, getMostattendedLectures, addLectureForSection,  getLecturesThatTheStudentattendmorethan8o0percentmiss};
module.exports = lectureRepository;