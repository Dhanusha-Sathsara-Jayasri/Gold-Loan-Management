const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
   myFile: String,
});

export default mongoose.models.post || mongoose.model('post', postSchema);