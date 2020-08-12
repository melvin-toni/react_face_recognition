const multer = require('multer');
const vision = require('@google-cloud/vision');
let newNameFile;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split('.').pop();
        newNameFile = `processImage-${Date.now()}.${ext}`;
        cb(null, newNameFile);
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

exports.create = (req, res) => {
    upload.single('avatar')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.log(`Multer faced error when uploading => ${err}`);
            return res.send({ 'msg': 'Server error when uploading' });
        } else if (err) {
            console.log(`Error when uploading => ${err}`);
            return res.send({ 'msg': 'Error when uploading' });
        }
    
        const client = new vision.ImageAnnotatorClient();
        const fileName = `./uploads/${newNameFile}`;
        
        try {
            const [result] = await client.faceDetection(fileName);
            const faces = result.faceAnnotations;
            if (faces && faces.length > 0)
                return res.send({ 'msg': 'Face detected' });
            else 
                return res.send({ 'msg': 'No face detected' });
            
        } catch(err) {
            console.log(`Google Service error => ${err}`);
            return res.send({ 'msg': 'Face detection failed' });
        }
        
    })
};

exports.read = function(req, res) {
    return res.status(200).send('READY');
};