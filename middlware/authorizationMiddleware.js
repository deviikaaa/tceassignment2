// middleware/authorizationMiddleware.js

const isAuthenticated = (req, res, next) => {
    // Check if user is registered
    if (req.user) {
      return next();
    } else {
      return res.status(401).json({ error: 'Unauthorized - User not registered' });
    }
  };
  
  const isSubscribed = (req, res, next) => {
    // Check if user is subscribed
    if (req.user && req.user.isSubscribed) {
      return next();
    } else {
      return res.status(403).json({ error: 'Forbidden - User not subscribed' });
    }
  };
  
  module.exports = { isAuthenticated, isSubscribed };
  