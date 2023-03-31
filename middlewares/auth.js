const jwt = require('jsonwebtoken');

const auth=(req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        try {
        const decoded = jwt.verify(token,'user');
        if(decoded){
            req.body.userID=decoded.userID;
            next();
        }
        } catch (error) {
            res.status(400).send({"err":"You are not authorized"})
        }
    }else res.status(400).send({"err":"You are not authorized"})
   
}

module.exports = {auth}