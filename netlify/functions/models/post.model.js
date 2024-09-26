const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
   myFile: String,
},{
   versionKey: false, 
});

const post = mongoose.model('test', postSchema);
module.exports = post;