const express = require('express');
const authController = require('../controller/authController');
const { body } = require('express-validator');

const router = express.Router();

const loginValidator = [
    body('email').notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
         .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')    
]

router.post('/login',loginValidator,authController.login);
router.post('/logout',authController.logout);
router.post('/isUserLoggedIn',authController.isUserLoggedIn);
router.post('/register',authController.register);
router.post('/google-auth',authController.googleAuth);

module.exports = router;