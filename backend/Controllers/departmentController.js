const departmentRepository = require("../models/queries/departmentQuery");

const getdepartments = async (req, res, next) => {
    try {
        const departments = await departmentRepository.getdepartments();

        res.status(200).json({
            success: true,
            departments
        });
    }
    catch (err) {
        return next(err);
    }
};

const departmentController = { getdepartments };
module.exports = departmentController;