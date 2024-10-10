const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        console.log('Cookies:', req.cookies)
        const token = req.cookies.token;
       //const token = req.headers["authorization"].split(" ")[1]

        // Check if token exists
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

        // Attach user information to the request
        req.userId = decoded.userId;
        req.role = decoded.role;

        next();  // Proceed to the next middleware or route handler

    } catch (error) {
        console.error('Error while verifying token:', error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = verifyToken;
