// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware to authenticate and authorize user
function authenticateRole(role) {
  return function(req, res, next) {
    // Get token from Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify token
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        // If token is invalid, return 401 error
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
  }
}

module.exports = { authenticateRole };  // Export the middleware
