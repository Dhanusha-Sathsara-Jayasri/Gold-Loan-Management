const MortgageDeed = require('../models/mortgageDeedDetails');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

// GridFS storage settings
const storage = new GridFsStorage({
    url: 'mongodb+srv://admin:admin@cluster0.gzqwq.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Cluster0',
    file: (req, file) => {
        return {
            bucketName: 'uploads',
            filename: `${Date.now()}-${file.originalname}`,
        };
    },
});

const upload = multer({ storage }).single('file');

const mortgageDeedController = {
    // Upload mortgage deed details with image
    addMortgageDeed: async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).send({ status: 'fail', message: 'Image upload failed', error: err });
            }

            try {
                // After image upload, save the rest of the form data
                const { institution, branch, startDate, endDate, contactNumber, monthlyRate, yearlyRate, receiptNumber, appraisedValue, mortgageAmount, rescueAmount } = req.body;

                const newMortgageDeed = new MortgageDeed({
                    institution,
                    branch,
                    startDate,
                    endDate,
                    contactNumber,
                    monthlyRate: parseFloat(monthlyRate),
                    yearlyRate: parseFloat(yearlyRate),
                    receiptNumber,
                    appraisedValue: parseFloat(appraisedValue),
                    mortgageAmount: parseFloat(mortgageAmount),
                    rescueAmount: parseFloat(rescueAmount),
                    imageUrl: `/api/mortgageDeed/image/${req.file.filename}`, // Store the image URL
                });

                await newMortgageDeed.save();
                res.send({ status: 'success', message: 'Mortgage Deed uploaded successfully', data: newMortgageDeed });

            } catch (error) {
                res.status(500).send({ status: 'fail', message: 'Error while uploading mortgage deed', error });
            }
        });
    },

    // Get the image by filename
    getImage: (req, res) => {
        const gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads'); // Collection name

        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            if (!file || file.length === 0) {
                return res.status(404).json({ err: 'No file exists' });
            }

            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            } else {
                res.status(404).json({ err: 'Not an image' });
            }
        });
    },
};

module.exports = mortgageDeedController;