// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware to authenticate and authorize user
function authenticateRole(role) {
  return function(req, res, next) {
    // Get token from Authorization header
    const bearerHeader = req.headers['authorization']; // Fetching the authorization header
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' '); // Splitting at the space
      const token = bearer[1]; // Getting the actual token

      // Verify token
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          // If token is invalid, return 401 error
          console.error(err)
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          // If token is valid, check role
          if (decoded.role !== role) {
            // If user does not have correct role, return 403 error
            return res.status(403).json({ message: 'Forbidden: incorrect role' });
          } else {
            // If user has correct role, proceed
            next();
          }
        }
      });
    } else {
      // If the Authorization header is undefined, return 403 error
      res.status(403).json({ message: 'Forbidden: No token provided' });
    }
  }
}

module.exports = { authenticateRole };  // Export the middleware
