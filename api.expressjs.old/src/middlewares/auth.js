const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ error: "Your request must contain the JWT token in Authorization header"});
    }

    const parts = authHeader.split(' ');
    if(!parts.length === 2){
        return res.status(401).send({ error: "The JWT token format is invalid"});
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: "The JWT token must contain Bearer scheme"});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({ error: "The JWT token is invalid"});
        }
        else{
            req.userId = decoded.id;
            return next();
        }
    });
}