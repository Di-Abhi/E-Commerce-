const jwt = require('jsonwebtoken');
const secret = 'a401d85c-58c1-46fd-b063-150790d3f36c';

const authController = {
    login: (req,res)=>{
        const {username, password} = req.body;

        if(username === 'admin' && password === 'admin'){
            const userDetails ={
                name: 'Abhishek',
                email: 'abhi@gmail.com',
            };
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
        } else{
            res.status(401).json({
                message: 'Invalid username or password'
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