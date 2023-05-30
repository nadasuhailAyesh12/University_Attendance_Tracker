const { node_env } = require("../config/enviroment");
const ErrorHandler = require("../helpers/ErrorHandlerHelper");

module.exports = (err, req, res, next) => {
    err.message = err.message || "internal server error";
    err.statusCode = err.statusCode || 500;

    // if (node_env == "development") {
    //     console.log(err);

    //     res.status(err.statusCode).json({
    //         sucess: false,
    //         error: err,
    //         stack: err.stack,
    //         errorMessage: err.message,
    //     });
    // }

    // else if (node_env === "production" || node_env === "test") {
    if (err.code === '23505') {
        const message = `duplicate value violates unique constraint entered`;
        err = new ErrorHandler(message, 409);
    }
    if (err.code === '0') {
        const message = "document not found"
        err = new ErrorHandler(message, 404);
    }
    if (err.code === '23503') {
        const message = "Foreign key constraint violation occurred"
        err = new ErrorHandler(message, 400);
    }

    if (err.code === '23502') {
        const message = "couldn’t use null values"
        err = new ErrorHandler(message, 400);
    }
    if (err.code === '22018') {
        const message = `mismatch data type `;
        err = new ErrorHandler(message, 400);
        console.log(err.messsage)
    }

    if (err.code === '22P02') {
        const message = 'invalid input type';
        err = new ErrorHandler(message, 400);
    }

    if (err.code === '22001') {
        const message = 'Data size exceeds the specified limit';
        err = new ErrorHandler(message, 400);
    }

    if (err.code === '23514') {
        const message = 'Check constraint violation occurred';
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}
// };


