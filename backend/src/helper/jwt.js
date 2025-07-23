import jwt from 'jsonwebtoken';
import express from 'express';


export const verifyToken = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1]; // Assuming the token is

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

     jwt.verify(token, 'secreate', (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' , error: err.message });
        }
        if (decoded.email === user.email) {
            res.json({ status: "success" , message: "Email succefully match"})
        }
        // Log the decoded token for debugging
        // This will show the payload of the token, which can help in debugging
        // Remove this in production for security reasons
         console.log('Decoded token:', decoded);
        // If everything is good, save the decoded token to request for use in other routes
        req.userId = decoded.id;
        next();
    });
};