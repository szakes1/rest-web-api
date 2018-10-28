const multer = require('multer');
const express = require('express');
const router = express.Router();
const dllsController = require('../controllers/dlls');

/// Handle uploaded files with multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/x-msdownload') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 50
    },
    fileFilter
});
///


router.get('/', dllsController.dlls_get_all);
// router.get('/:dllId', dllsController.dlls_get_one);

router.post('/', upload.single('dllFile'), dllsController.dlls_add_new);

module.exports = router;