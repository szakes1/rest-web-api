const multer = require('multer');
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
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


// GET routes
router.get('/', checkAuth, dllsController.dlls_get_all);
router.get('/:dllId', checkAuth,dllsController.dlls_get_one);

// POST routes
router.post('/', checkAuth, upload.single('dllFile'), dllsController.dlls_add_new);

// PUT routes
router.put('/:dllId', checkAuth, upload.single('dllFile'), dllsController.dlls_update_one);

// DELETE routes
router.delete('/:dllId', checkAuth, dllsController.dlls_delete_one);

module.exports = router;