const chalk = require('chalk');
const statusCode = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    LENGTH_REQUIRED: 411,
    PAYLOAD_TOO_LARG: 413,
    UNSUPPORTED_MEDIA_TYPE: 415
};

exports.success = (req, res, message) => {
    console.log(`${chalk.green(statusCode.OK)} ${req.method} - ${req.originalUrl}`);
    res.status(statusCode.OK).json({success: true, messages: [message]});
}

exports.failed = (req, res, err) => {
    console.log(`${chalk.red(statusCode.INTERNAL_SERVER_ERROR)} ${req.method} - ${req.originalUrl}`);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({success: false, messages: [err]});
}