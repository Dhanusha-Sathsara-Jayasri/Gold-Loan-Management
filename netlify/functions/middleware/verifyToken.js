require('dotenv').config(); // Load environment variables
const jwt = require('jsonwebtoken');

const JWT_SECRET = "test";

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id; // Add user ID to the request object
        req.userType = decoded.userType; // Add user type to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = verifyToken;