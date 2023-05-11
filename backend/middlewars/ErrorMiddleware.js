const { node_env } = require("../config/enviroment");

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
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}
// };


