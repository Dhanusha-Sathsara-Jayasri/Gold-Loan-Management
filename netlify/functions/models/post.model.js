const mongoose = require('mongoose');

const postScheema = mongoose.Schema({
   myFile : String,
});

export default mongoose.model.posts || mongoose.model('post',postScheema);