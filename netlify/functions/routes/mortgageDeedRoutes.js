const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  
    }
});

const upload = multer({ storage });

const MortgageDeedController = require('../controllers/mortgageDeedController');

router.post('/addMortgageDeed', upload.single('image'), MortgageDeedController.addMortgageDeed);

module.exports = router;