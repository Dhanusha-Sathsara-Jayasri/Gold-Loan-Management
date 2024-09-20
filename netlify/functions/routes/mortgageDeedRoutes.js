const express = require('express');
const router = express.Router();

const upload = multer({ storage });

const mortgageDeedController = require('../controllers/mortgageDeedController');
router.post('/addMortgageDeed', upload.single('file'), mortgageDeedController.addMortgageDeed);
module.exports = router;