import { stripHtml } from "string-strip-html";

export function sanitizeUser(req, res, next){
    const receivedUser = req.body;

    const user = {...receivedUser, 
        name: stripHtml(receivedUser.name).result,
        email: stripHtml(receivedUser.email).result,
        password: stripHtml(receivedUser.password).result,
        confirmPassword: stripHtml(receivedUser.confirmPassword).result
    }
    
    res.locals.user = user;

    next();
}