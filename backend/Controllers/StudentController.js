const studentRepository = require("../models/queries/StudentQuery");

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
        // return next(err)
        console.log(err)
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const oldID = req.params.id;
        const { ID, first_name, middle_initial, middle_final, final_name, dept_name, location } = req.body;
        await studentRepository.updateStudent(oldID, first_name, middle_initial, middle_final, final_name, dept_name, location, ID);
        res.status(200).json({
            success: true,
            message: 'nada'
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
            message: 'added successfuly'
        })
    }
    catch (err) {
        return next(err)
    }
}

const StudentController = { addAttendance, getStudents, updateStudent, search, addStudent }
module.exports = StudentController;