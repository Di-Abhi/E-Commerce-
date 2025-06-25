const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'a401d85c-58c1-46fd-b063-150790d3f36c';
const Users = require('../model/UserSchema');
const { OAuth2Client } = require('google-auth-library');

const authController = {
    login: async (req,res)=>{
        try{
        const {email, password} = req.body;

        const data = await Users.findOne({ email: email });
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

    register: async (req,res)=>{
        try {
            const {email,password,name} = req.body;
            const data = await Users.findOne({ email: email });

            if(data){
                return res.status(401).json({message: 'User already exists'});
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = new Users({
                email: email,
                password: encryptedPassword,
                name: name
            });
            await user.save();
            res.status(200).json({
                message: 'User registered successfully'
            });
        }catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },


    googleAuth: async(req,res)=>{
        const {idToken} = req.body;
        if (!idToken) {
            return res.status(400).json({ message: 'ID token is required' });
        }
        try{
            const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const googleResponse = await googleClient.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = googleResponse.getPayload();
            const {sub: googleId, email, name} = payload;

            let data = await Users.findOne({email: email});
            if (!data) {
                data = new Users({
                    email: email,
                    name: name,
                    isGoogleUser: true,
                    googleId: googleId
                });
                await data.save();
        }

        const user = {
            id: data._id? data._id: googleId,
            email: email,
            name: name,
        }

        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        res.cookie('jwtToken', token, {
            httpOnly: true,
            secure: true,
            domain: 'localhost',
            path:'/'
        })
        res.json({
                message: 'User Authenticated',
                userDetails: user,
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