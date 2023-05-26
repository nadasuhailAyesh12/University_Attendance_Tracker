const instructorRepository = require("../models/queries/InstructorQuery");

const addInstructor = async (req, res, next) => {
    try {
        const { id, name, dept_name, role } = req.body
        await instructorRepository.addInstructor(id, name, dept_name, role)

        res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        return next(error)
    }
}

const updateInstructor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ID, name, dept_name, role } = req.body
        await instructorRepository.updateInstructor(id, name, dept_name, role, ID)

        res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        return next(error)
    }
}

const deleteInstructor = async (req, res, next) => {
    try {
        const { id } = req.params;
        await instructorRepository.deleteInstructor(id)

        res.status(204).json({
            success: true,
        });
    }
    catch (error) {
        return next(error)
    }
}

const searchInstructor = async (req, res, next) => {
    try {
        const { name } = req.params;
        const instructor = await instructorRepository.searchInstructor(name)

        res.status(200).json({
            success: true,
            instructor
        });
    }
    catch (error) {
        return next(error)
    }
}

const getInstructors = async (req, res, next) => {
    try {
        const instructors = await instructorRepository.getInstructors()

        res.status(200).json({
            success: true,
            instructors
        });
    }
    catch (err) {
        return next(err);
    }
};


const instructorController = { addInstructor, deleteInstructor, updateInstructor, searchInstructor, getInstructors }
module.exports = instructorController