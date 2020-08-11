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
    if (req.body.description==='p') {
        return res.status(200).send({ 'data': 'user created in db madafaka' });
    } else {
        return res.status(400).send({ 'data': 'can not find it' });
    }

    // upload.single('avatar')(req, res, function (err) {
    //     if (err instanceof multer.MulterError) {
    //         console.log(`Multer faced error when uploading => ${err}`);
    //     } else if (err) {
    //         console.log(`Error when uploading => ${err}`);
    //     }
    
    //     return res.status(200);
    // })
};

exports.read = function(req, res) {
    return res.status(200).send('READY');
};