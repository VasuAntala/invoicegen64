import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secreate'; // Use process.env.JWT_SECRET in production!

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token', error: err.message });
        }
        
        // Save user info to request object
        req.user = decoded;
        req.userId = decoded.email; // Using email as userId for now
        next();
    });
};