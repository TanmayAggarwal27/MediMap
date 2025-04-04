const JWT = require("jsonwebtoken")
const secret ="YoY0@123"


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
module.exports={
    createTokenUser,
    validateToken,
    checkForAuthenticationCookie,

}
