const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
   myFile: String,
},{
   versionKey: false, 
});

const post = mongoose.model('post-application-images', postSchema);
module.exports = post;
