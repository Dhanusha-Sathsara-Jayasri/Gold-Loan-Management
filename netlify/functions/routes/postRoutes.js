const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.post('/upload', postController.uploadImage);

module.exports = router;