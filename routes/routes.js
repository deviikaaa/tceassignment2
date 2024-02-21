const express = require('express');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const blogController = require('./controllers/blogController');

const router = express.Router();

// User Routes
router.post('/register', userController.registerUser);
router.get('/users', userController.getAllUsers);
router.get('/search/:query', blogController.searchBlogTitles);

// Authentication Routes
router.post('/login', authController.loginUser);

module.exports = router;
