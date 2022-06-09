import { Router } from "express";

import { sanitizeUrl } from "../middlewares/urlsMiddlewares/sanitizeUrl.js"
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/urlsMiddlewares/validateToken.js";
import { shortenUrl, getUrl, openUrl, deleteUrl } from "../controllers/urlsController.js";

import urlSchema from "../schemas/urlSchema.js"

const urlsRouter = Router();

urlsRouter.post("/urls/shorten",
    sanitizeUrl,
    (req, res, next) => validateSchema(req, res, next, urlSchema),
    validateToken,
    shortenUrl
);

urlsRouter.get("/urls/:id", getUrl);

urlsRouter.delete("/urls/:id", validateToken, deleteUrl);

urlsRouter.get("/urls/open/:shortUrl", openUrl);


export default urlsRouter;