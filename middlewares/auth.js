const jwt = require('jsonwebtoken');

const auth=(req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        try {
        const decoded = jwt.verify(token,'user');
        if(decoded){
            req.body.userId=decoded.userId;
            next();
        }
        } catch (e) {
            res.status(400).send({"err":e})
        }
    }else res.status(400).send({"err":"You are not authorized 2"})
   
}

module.exports = {auth}