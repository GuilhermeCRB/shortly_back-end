import { stripHtml } from "string-strip-html";

export function sanitizeUrl(req, res, next){
    const receivedUrl = req.body;

    const user = {...receivedUrl, 
        url: stripHtml(receivedUrl.url).result
    }
    
    res.locals.user = user;

    next();
}