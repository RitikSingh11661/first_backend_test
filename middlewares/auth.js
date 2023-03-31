const jwt = require('jsonwebtoken');

const auth=(req,res,next) => {
    const token = req.headers.authorization;
    console.log('token',token)
    if(token){
        try {
        const decoded = jwt.verify(token,'user');
        console.log('decoded',decoded)
        if(decoded){
            req.body.userID=decoded.userID;
            next();
        }
        } catch (error) {
            res.status(400).send({"err":"You are not authorized "})
        }
    }else res.status(400).send({"err":"You are not authorized 2"})
   
}

module.exports = {auth}