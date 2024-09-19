// const Post = require('../models/post.model'); 

// const postController = {
//     uploadImage: async (req, res) => {
//         const { myFile } = req.body; 
//         try {
//             const newPost = new Post({
//                 myFile
//             });
            
//             const result = await newPost.save();
//             res.status(200).json({ message: 'Image uploaded successfully', result });
//         } catch (error) {
//             res.status(500).send({ status: "Error While Uploading Image", data: error });
//         }
//     }
// };

// module.exports = postController;

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: 'mongodb+srv://admin:admin@cluster0.gzqwq.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Cluster0',
    options : {useNewUrlParsers: true,useUnifiedTopology:true},
    file:(req,file) => {
        const match = ["image/png","image/jpeg"];

        if(match.indexOf(file.mimetype) === -1){
            const fileName = `${Date.now()}-any-name-${file.originalname}`;
            return fileName;
        }

         return{
            bucketName : "photos",
            fileName : `${Date.now()}-any-name-${file.originalname}`
         }  

    }
});

module.exports = multer({storage});