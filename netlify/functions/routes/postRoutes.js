// const express = require('express');
// const router = express.Router();

// const postController = require('../controllers/postController');
// router.post('/upload', postController.uploadImage);

// module.exports = router;

const upload = require('../controllers/postController');
const express = require('express');
const router = express.Router();

router.post("/upload",upload.single("file"),(req,res) => {

    if(req.file === undefined) return res.send("you must select a file.");
    const imgURL = `http://localhost:8080/file${req.file.filename}`;
    return res.send(imgURL);
});

module.exports = router;