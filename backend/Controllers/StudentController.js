const studentRepository = require("../models/queries/StudentQuery");

const searchByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await studentRepository.getStudentByID(id)

        res.status(200).json({
            success: true,
            student
        });
    }
    catch (err) {
        return next(err);
    }
};

const searchByPhone = async (req, res, next) => {
    try {
        const { phone } = req.params;
        console.log(phone);
        const text = "hello nafa here";
        const myArray = text.split(" ");
        console.log(myArray[1], myArray[2]);
        const student = await studentRepository.getStudentByphone(phone)
        res.status(200).json({
            success: true,
            student
        });
    }
    catch (err) {
        return next(err);
    }
};

const searchByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const nameArguments = name.split(' ');
        const student = await studentRepository.getStudentByName(nameArguments[0], nameArguments[1], nameArguments[2], nameArguments[3])
        res.status(200).json({
            success: true,
            student
        });
    }
    catch (err) {
        return next(err);
    }
};

const addAttendance = async (req, res, next) => {
    try {
        const { ID, lecture_id } = req.body;
        console.log(lecture_id)
        await studentRepository.registerStudentAttendance(lecture_id, ID);
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

const StudentController = { searchByID, searchByPhone, searchByName, addAttendance, getStudents, updateStudent }
module.exports = StudentController;