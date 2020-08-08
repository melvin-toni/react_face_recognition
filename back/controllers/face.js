const { success, failed } = require("../helpers/utilities");

exports.create = function(req, res) {
    if (req.body.face) {
        success(req, res, `Face Detected`);
    } else {
        failed(req, res, `No Face Detected`);
    }
};