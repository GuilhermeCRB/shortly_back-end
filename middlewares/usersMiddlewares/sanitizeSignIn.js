import { stripHtml } from "string-strip-html";

export function sanitizeSignIn(req, res, next){
    const receivedUser = req.body;

    const user = {...receivedUser, 
        email: stripHtml(receivedUser.email).result,
        password: stripHtml(receivedUser.password).result
    }
    
    res.locals.user = user;

    next();
}