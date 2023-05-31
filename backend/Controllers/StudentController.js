const studentRepository = require("../models/queries/StudentQuery");
const db = require("../models/seeding/Connection");

const search = async (req, res, next) => {
    try {
        const { options } = req.params;

        const student = await studentRepository.search(options)
        res.status(200).json({
            success: true,
            student
        });
    }
    catch (err) {
        console.log(err)
        return next(err);
    }
};

const addAttendance = async (req, res, next) => {
    try {
        const { lecture_id } = req.body;
        const { id, sec_id, course_id } = req.params
        await studentRepository.registerStudentAttendance(lecture_id, id, sec_id, course_id);
        res.status(200).json({
            success: true,
            message: "register attendance successfuly"
        })
    }
    catch (err) {
        return next(err);
    }
}

const getStudents = async (req, res, next) => {
    try {
        const { dept_name, course_id, sec_id } = req.params;
        const students = await studentRepository.getStudents(dept_name, course_id, sec_id)
        res.status(200).json({
            success: true,
            students
        })
    }
    catch (err) {
        return next(err)
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const oldID = req.params.id;
        const { ID, first_name, middle_initial, middle_final, final_name, dept_name, location } = req.body;
        await studentRepository.updateStudent(oldID, first_name, middle_initial, middle_final, final_name, dept_name, location, ID);
        res.status(200).json({
            success: true,
            message: 'student updated successfuly'
        })
    }
    catch (err) {
        return next(err)
    }
}

const addStudent = async (req, res, next) => {
    try {
        const { id, first_name, middle_initial, middle_final, final_name, gender, location, dept_name } = req.body;
        await studentRepository.addStudent(id, first_name, middle_initial, middle_final, final_name, gender, location, dept_name);
        res.status(200).json({
            success: true,
            message: ' student added successfuly'
        })
    }
    catch (err) {
        return next(err)
    }
}

const getMostCommitedStudents = async (req, res, next) => {
    try {
        const { course_id, sec_id } = req.params;
        const students = await studentRepository.getMostCommitmentStudents(course_id, sec_id)
        const commitedStudents = []
        for (let i = 0; i < students.length; i++) {
            commitedStudents[i] = await studentRepository.getStudentbyID(students[i].id)
        }

        res.status(200).json({
            success: true,
            commitedStudents
        })
    }
    catch (err) {
        return next(err)
    }
}

const getStudentsWhomiss3ConsecutiveLectures = async (req, res, next) => {
    try {
        const students = await studentRepository.getStudentsWhomissed3consecutiveLectures()
        const uncommitedStudents = []
        for (let i = 0; i < students.length; i++) {
            uncommitedStudents[i] = await studentRepository.getStudentbyID(students[i].id)
        }

        res.status(200).json({
            success: true,
            uncommitedStudents
        })
    }
    catch (err) {
        return next(err)
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        await studentRepository.deleteStudent(id)

        res.status(200).json({
            success: true,
            message: "student deleted successfuly"
        });
    }
    catch (err) {
        return next(err);
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const students = await db.any('select * from student')

        res.status(200).json({
            success: true,
            students
        });
    }
    catch (err) {
        return next(err);
    }
}

const StudentController = { addAttendance, getStudents, updateStudent, search, addStudent, getMostCommitedStudents, deleteStudent, getStudentsWhomiss3ConsecutiveLectures, getAllStudents }
module.exports = StudentController;