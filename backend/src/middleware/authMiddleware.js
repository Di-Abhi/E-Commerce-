const jwt = require('jsonwebtoken');

const authMiddleware = {
    protect: async (req,res,next)=>{
        try{
            const token = req.cookies?.jwtToken;
            if(!token){
                return res.status(401).json({error: 'Not Authorized'});
            }

            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            next();
        }catch(error){
            console.log(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }
}

module.exports = authMiddleware;