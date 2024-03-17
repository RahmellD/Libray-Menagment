const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).send('Authorization header is missing');
        }

        const token = authorizationHeader.split(' ')[1];

        // Decode the token to get user information
        const decodedToken = jwt.decode(token, process.env.SECRET_KEY);

        if (!decodedToken) {
            return res.status(401).send('Invalid token');
        }

        // Optionally, check if the user has the necessary roles
        const userRoles = decodedToken.role;

        // Check if the user has the 'Admin' role
        if (userRoles && userRoles.includes('Admin')) {
            // User has 'Admin' role, continue to the next middleware
            req.user = decodedToken;
            next();
        } else {
            // User does not have the required role
            return res.status(403).send('Access forbidden. Admin permissions needed.');
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).send('Invalid token');
        } else {
            console.error(error);
            res.status(500).send('Internal server error!');
        }
    }
};

module.exports = verifyToken;

