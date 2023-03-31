const jwt = require('jsonwebtoken');

const auth=(req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        try {
        const decoded = jwt.verify(token,'user');
        console.log('decoded.userId',decoded.userId)
        if(decoded){
            req.body.userId=decoded.userId;
            console.log('req.body before adding',req.body)
            next();
        }
        } catch (e) {
            res.status(400).send({"err":e})
        }
    }else res.status(400).send({"err":"You are not authorized 2"})
   
}

module.exports = {auth}