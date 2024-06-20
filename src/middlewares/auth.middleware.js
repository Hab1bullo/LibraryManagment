import dotenv from 'dotenv';
import { tokenVerify } from '../utils/jwt.js'
// import { errorLogger } from '../utils/logs.js';
dotenv.config();

export const userMiddleware = async (req, res, next) => {

    try{
        const [type, token] = req.headers.authorization.split(' ');

        if(type != 'Bearer'){
            return res.status(401).send({
                error: "Access denied"
            });
        };

        if(token == false){
            return res.status(403).send({
                message: "Authentication failed"
            });
        };
        
        const decoded =  tokenVerify(token);
        req.user = decoded
        next();

    } catch (err) {
        console.log(err);
        return res.status(401).send({
            error: "Invalid token"
        });
    };
};