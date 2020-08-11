const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split('.').pop();
        cb(null, `processImage-${Date.now()}.${ext}`);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage: storage, fileFilter: fileFilter });
const { success, failed } = require("../helpers/utilities");

exports.create = (req, res) => {
    console.log('SENT FROM FRONT END', req.body);
    // if (req.body.description==='p') {
    //     return res.send({ 'msg': 'Face detection success' });
    // } else {
    //     return res.send({ 'msg': 'Face detection failed' });
    // }

    upload.single('avatar')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(`Multer faced error when uploading => ${err}`);
            return res.send({ 'msg': 'Server error when uploading' });
        } else if (err) {
            console.log(`Error when uploading => ${err}`);
            return res.send({ 'msg': 'Error when uploading' });
        }
    
        // return res.status(200);
        return res.send({ 'msg': 'Face detection success' });
    })
};

exports.read = function(req, res) {
    return res.status(200).send('READY');
};