const db = require("../seeding/Connection");
const { PreparedStatement } = require("pg-promise")

const getStudentsWhoAttendLessthan25Percent = async (course_id, sec_id) => {
    const getStudentDroppedQuery = new PreparedStatement({
        name: 'getStudentDropped', text: `SELECT student.ID from student natural join takes
 where ID  not in (select attendance.ID FROM attendance 
    WHERE course_id = $1 and sec_id=$2
    GROUP BY attendance.ID
HAVING (COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id =$1 and sec_id=$2) >=25)`,
        values: [course_id, sec_id]
    });
    return db.any(getStudentDroppedQuery);
}

const getStudentAttendanceReport = async (id) => {
    const getStudentAttendanceQuery = new PreparedStatement({
        name: 'getStudentAttendance', text: `SELECT * from attendance where ID=$1 `,
        values: [id]
    });
    return db.any(getStudentAttendanceQuery);
}
const getStudentsWhomissed3consecutiveLectures = async () => {
    const getStudentmissed3LecturesQuery = new PreparedStatement({
        name: 'getStudentmissed3LecturesQuery ', text: `
        WITH diffs AS (
  SELECT a.ID, a.lecture_id - LAG(a.lecture_id) OVER (PARTITION BY a.ID ORDER BY a.lecture_id) AS diff
  FROM attendance a
)
SELECT distinct d.ID
FROM diffs d
WHERE EXISTS (
  SELECT 1
  FROM diffs d2
  WHERE d2.ID = d.ID
  GROUP BY d2.ID
  HAVING MAX(d2.diff) > 3
); `,
    });
    const students = await db.any(getStudentmissed3LecturesQuery);
    return students;
}

const search = async (argument) => {
    if (isNaN(argument)) {
        const searchQuery = new PreparedStatement({ name: 'searchName', text: "select * from student where CONCAT(first_name, ' ', middle_initial,' ',middle_final,' ',final_name) iLIKE $1 limit 10 ;" });
        const user = await db.any(searchQuery, [`%${argument}%`]);
        return user;
    }
    else {
        const searchQuery = new PreparedStatement({
            name: 'getStudentByID', text: `select student.ID,first_name,middle_initial,middle_final,final_name,gender,location
         from student left outer join student_phone 
        on student.ID=student_phone.ID
        WHERE student.ID=$1
    OR phone_number=$1
    limit 3`
        });
        const user = await db.any(searchQuery, [argument]);
        return user;
    }
}

const registerStudentAttendance = async (lecture_id, ID, sec_id, course_id) => {
    const registerStudentAttendanceQuery = new PreparedStatement({
        name: 'registerStudentAttendance', text: "insert into attendance VALUES($1, $2,$3,$4)"
    });
    await db.none(registerStudentAttendanceQuery, [lecture_id, ID, sec_id, course_id]);
}

const getStudents = async (dept_name, course_id, sec_id) => {
    const getStudentsQuery = new PreparedStatement({
        name: 'getStudentQuery', text: `select * from student natural join takes
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
const getMostCommitmentStudents = async (course_id, sec_id) => {
    const getStudentmostCommitmenQuery = new PreparedStatement({
        name: 'getmostStudnetsQuery', text: `SELECT ID ,COUNT(*) AS count
FROM attendance  
where course_id =$1 and sec_id =$2
GROUP BY  id 
ORDER BY count desc
limit 10`,
        values: [course_id, sec_id]
    })
    const students = await db.any(getStudentmostCommitmenQuery);
    return students;
}

const getStudentbyID = async (id) => {
    const getStudentByID = new PreparedStatement({
        name: 'getStudnetWithIDQuery', text: `select ID,first_name,middle_initial,middle_final,final_name,gender,location from student
where ID=$1`,
        values: [id]
    })
    const student = await db.one(getStudentByID);
    return student;
}

const deleteStudent = async (id) => {
    const deleteQuery = new PreparedStatement({
        name: 'deleteStudent',
        text: 'delete from student where ID=$1',
        values: [id]
    })
    await db.none(deleteQuery);
}

const updateStudentReport = async (course_id, sec_id, lecture_id, ID) => {
    const updateStudenReportQuery = new PreparedStatement({
        name: 'updateStudentReport', text: "insert into attendance VALUES($1, $2,$3,$4)"
    });
    await db.none(updateStudenReportQuery, [lecture_id, ID, sec_id, course_id]);
    return db.any('select * from attendance where ID=$1', [ID])
}

const getStudentbyIDAnDDept = async (id) => {
    const getStudentbyIDAnDDeptQuery = new PreparedStatement({
        name: 'getStudentbyIDAnDDeptQuery', text: `select ID,first_name,middle_initial,middle_final,final_name,gender,location ,dept_name from student
where ID=$1`,
        values: [id]
    })
    const student = await db.one(getStudentbyIDAnDDeptQuery);
    return student;
}
const AddstudentBelongToCourse = async (ID, sec_id, course_id, semester, year) => {
    const addStudentBelong = new PreparedStatement({
        name: 'addStudentBelong', text: "insert into takes values($1,$2,$3,$4,$5)"
    })
    addStudentBelong.values = [sec_id, course_id, semester, year, ID];
    await db.none(addStudentBelong);
}

const studentRepository = { getStudentsWhoAttendLessthan25Percent, registerStudentAttendance, getStudents, updateStudent, search, addStudent, getMostCommitmentStudents, deleteStudent, getStudentbyID, getStudentAttendanceReport, updateStudentReport, getStudentsWhomissed3consecutiveLectures, AddstudentBelongToCourse, getStudentbyIDAnDDept };
module.exports = studentRepository;