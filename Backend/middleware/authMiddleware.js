const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtsecret = process.env.JWT_SECRET

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, jwtsecret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { authenticate };
