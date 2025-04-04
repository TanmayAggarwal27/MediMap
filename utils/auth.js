require("dotenv").config()
const JWT = require("jsonwebtoken")
const secret = process.env.JWT_SECRET



function createTokenUser(user){
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }
    const token = JWT.sign(payload,secret)
    return token
}


function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload

}

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieName = req.cookies[cookieName];
        if(!tokenCookieName){
            return next();
            
        }
        try{
            const userPayload = validateToken(tokenCookieName)
            req.user = userPayload
            
        }
        catch(error){
           
        }
        next()

    }

}
function requireAuth(req, res, next) {
    if (!req.user) {
        console.log(req.user)
        return res.status(401).json({ message: "Unauthorized. Please log in." });
        
    }
    next();
}

module.exports={
    createTokenUser,
    validateToken,
    checkForAuthenticationCookie,
    requireAuth,
}
