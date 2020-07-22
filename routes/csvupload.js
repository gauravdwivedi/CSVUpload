const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'uploads/'));
    },
    filename: function (req, file, cb) {
        let datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

let upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(new Error('only CSV file format is allowed'))
        }
        cb(null, true)
    }
});

const filesController = require('../controllers/uploadcsv_Controller');

router.post('/upload', upload.single('csvfile'), filesController.uploadFile);
router.get('/', filesController.displayAllFiles);
router.get('/:id/view', filesController.openFile);

module.exports = router;