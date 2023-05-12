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
    if (err.code === 23505) {
        const message = `duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 409);
    }
    if (err.query) {
        if ((err.query.name === "login" || err.query.name === 'getUserByID' || err.query.name === 'checkPassword' && err.code === 0)) {
            const message = `User not found`;
            err = new ErrorHandler(message, 404);
        }
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}
// };


