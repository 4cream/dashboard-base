import jwt from "jsonwebtoken";
import { config } from "../config/app.js";

export const userSessionHandler = (req, res, next) => {

    const token = req.cookies.access_token;    
    req.session = {user: null};

    try {        
        const data = jwt.verify(token, config.jwt.secret);
        console.log("Hay data? ", data);
        
        req.session.user = data;
        console.log("req.session.user", req.session.user);
        
    } catch {}

    next();
}