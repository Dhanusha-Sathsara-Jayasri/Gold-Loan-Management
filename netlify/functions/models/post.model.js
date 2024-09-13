const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
   myFile: String,
});

const post = mongoose.model('post', postSchema);
module.exports = post;