const jwt = require('jsonwebtoken');

const extractToken = (req) => {
    const authHeader = req.headers.authorization;
    const headerToken = authHeader?.split(' ')[1];
    return headerToken || req.cookies?.token;
};

const authenticate = (req, res, next) => {
    const token = extractToken(req);
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const optionalAuthenticate = (req, res, next) => {
    const token = extractToken(req);

    if (token) {
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // invalid or expired token — proceed as an anonymous request
        }
    }

    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
}

module.exports = { authenticate, optionalAuthenticate, requireAdmin };