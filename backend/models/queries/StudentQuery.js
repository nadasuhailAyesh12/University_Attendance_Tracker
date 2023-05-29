const db = require("../seeding/Connection");
const { PreparedStatement } = require("pg-promise")

const getStudentsWhoAttendLessthan25Percent = async (course_id, sec_id) => {
    const getStudentDroppedQuery = new PreparedStatement({
        name: 'getStudentByID', text: `SELECT student.ID from student natural join takes
 where ID  not in (select attendance.ID FROM attendance 
    WHERE course_id = $1 and sec_id=$2
    GROUP BY attendance.ID
HAVING (COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id =$1 and sec_id=$2) >=25)`,
        values: [course_id, sec_id]
    });
    return db.any(getStudentDroppedQuery);
}

const search = async (argument) => {
    if (isNaN(argument)) {
        const nameArguments = argument.split(' ');
        const first_name = nameArguments[0];
        const middle_initial = nameArguments[1];
        const middle_final = nameArguments[2];
        const final_name = nameArguments[3];
        const searchQuery = new PreparedStatement({ name: 'getStudentByID', text: "select * from student where first_name ilike $1 or middle_initial ilike $2 and middle_final ilike $3 and final_name ilike $4" });
        const user = await db.one(searchQuery, [`%${first_name}%`, `%${middle_initial}%`, `%${middle_final}%`, `%${final_name}%`]);
        return user;
    }
    else {
        const searchQuery = new PreparedStatement({
            name: 'getStudentByID', text: `select student.ID,first_name,middle_initial,middle_final,final_name,gender,location
         from student left outer join student_phone 
        on student.ID=student_phone.ID
        WHERE student.ID=$1
    OR phone_number=$1`
        });
        const user = await db.one(searchQuery, [argument]);
        return user;
    }
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

const registerStudentAttendance = async (lecture_id, ID, sec_id, course_id) => {
    const registerStudentAttendanceQuery = new PreparedStatement({
        name: 'registerStudentAttendance', text: "insert into attendance VALUES($1, $2,$3,$4)"
    });
    await db.none(registerStudentAttendanceQuery, [lecture_id, ID, sec_id, course_id]);
}

const getStudents = async (dept_name, course_id, sec_id) => {
    const getStudentsQuery = new PreparedStatement({
        name: 'getStudentQuery', text: `select ID,first_name,middle_initial,middle_final,final_name,gender,location from student natural join takes
        where dept_name ilike $1 and course_id ilike $2 and sec_id=$3`,
        values: [dept_name, course_id, sec_id]
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

const addStudent = async (ID, first_name, middle_initial, middle_final, final_name, gender, location, dept_name) => {
    const addStudentQuery = new PreparedStatement({
        name: 'addStudentQuery', text: "insert into student values($1,$2,$3,$4,$5,$6,$7,$8)"
    })
    addStudentQuery.values = [ID, first_name, middle_initial, middle_final, final_name, gender, location, dept_name];
    await db.none(addStudentQuery);
}

const studentRepository = { getStudentsWhoAttendLessthan25Percent, getStudentByphone, getStudentByName, registerStudentAttendance, getStudents, updateStudent, search, addStudent };
module.exports = studentRepository;