const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'a401d85c-58c1-46fd-b063-150790d3f36c';
const Users = require('../model/UserSchema');

const authController = {
    login: async (req,res)=>{
        try{
        const {username, password} = req.body;

        const data = await Users.findOne({ email: username });
        if(!data){
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        const isMatch = await bcrypt.compare(password, data.password);
        if(!isMatch){
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        const userDetails = {
            id: data._id,
            email: data.email,
            name: data.name,
        } 
            const token = jwt.sign(userDetails, secret, { expiresIn: '1h' });
            res.cookie('jwtToken',token,{
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path:'/'
            });
            res.json({
                message: 'User Authenticated',
                userDetails: userDetails,
            });


        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },

    logout: (req,res)=>{
        res.clearCookie('jwtToken');
        res.json({
            message: 'User logged out successfully'
        });
    },

    isUserLoggedIn: (req, res) => {
        const token = req.cookies.jwtToken;
        if (!token) {
            return res.status(401).json({ message: 'User not logged in' });
        }

        jwt.verify(token, secret, (err, userDetails) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            res.json({
                message: 'User is logged in',
                userDetails: userDetails
            });
        });
    }
}

module.exports = authController;