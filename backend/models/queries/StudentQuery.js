const db = require("../seeding/Connection");
const { PreparedStatement } = require("pg-promise")

const getStudentsWhoAttendLessthan25Percent = async (course_id, sec_id) => {
    const getStudentDroppedQuery = new PreparedStatement({
        name: 'getStudentByID', text: `SELECT student.ID from student natural join takes
 where ID  not in (select attendance.ID FROM attendance 
    WHERE course_id = $1and sec_id=$2
    GROUP BY attendance.ID
HAVING (COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id =$1 and sec_id=$2) >=25)`,
        values: [course_id, sec_id]
    });
    const data = await db.any(getStudentDroppedQuery)
    return data;
}

const getStudentByID = async (ID) => {
    const getStudentByIDQuery = new PreparedStatement({ name: 'getStudentByID', text: "select * from student where ID= $1", values: [ID] });
    const user = await db.one(getStudentByIDQuery);
    return user;
}

const getStudentByphone = async (phone_number) => {
    const getStudentByphoneQuery = new PreparedStatement({ name: 'getStudentByPhone', text: "select * from student natural join student_phone where phone_number = $1", values: [phone_number] });
    const user = await db.one(getStudentByphoneQuery);
    return user;
}

const getStudentByName = async (firstName, middle_initial, middle_final, final_name) => {
    const getStudentByNameQuery = new PreparedStatement({ name: 'getStudentByID', text: "select * from student where first_name= $1 and middle_initial=$2 and middle_final=$3 and final_name=$4" });
    const user = await db.one(getStudentByNameQuery, [firstName, middle_initial, middle_final, final_name]);
    return user;
}

const registerStudentAttendance = async (lecture_id, ID) => {
    const registerStudentAttendanceQuery = new PreparedStatement({
        name: 'registerStudentAttendance', text: "insert into attendance VALUES($1, $2)"
    });
    await db.none(registerStudentAttendanceQuery, [lecture_id, ID]);
}

const getStudents = async () => {
    const getStudentsQuery = new PreparedStatement({
        name: 'getStudentQuery', text: "select * from student"
    })
    const students = await db.any(getStudentsQuery);
    return students;
}

const updateStudent = async (oldID, first_name, middle_initial, middle_final, final_name, dept_name, location, ID) => {
    const updateStudentQuery = new PreparedStatement({
        name: 'updateStudentQuery', text: "update student set ID=$8,first_name=$2,middle_initial=$3,middle_final=$4,final_name=$5,dept_name=$6,location=$7 where ID=$1"
    })
    updateStudentQuery.values = [oldID, first_name, middle_initial, middle_final, final_name, dept_name, location, ID];
    await db.none(updateStudentQuery);
}


const studentRepository = { getStudentsWhoAttendLessthan25Percent, getStudentByID, getStudentByphone, getStudentByName, registerStudentAttendance, getStudents, updateStudent };
module.exports = studentRepository;