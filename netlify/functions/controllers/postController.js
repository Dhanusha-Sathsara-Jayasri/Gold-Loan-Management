const Post = require('../models/post.model'); 

const postController = {
    uploadImage: async (req, res) => {
        const { myFile } = req.body; 
        try {
            const newPost = new Post({
                myFile
            });
            const result = await newPost.save();
            res.status(200).json({ message: 'Image uploaded successfully', result });
        } catch (error) {
            res.status(500).send({ status: "Error While Uploading Image", data: error });
        }
    }
};

export default postController;