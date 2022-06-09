import { Router } from "express";

import { sanitizeUrl } from "../middlewares/urlsMiddlewares/sanitizeUrl.js"
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/urlsMiddlewares/validateToken.js";
import { shortenUrl } from "../controllers/urlsController.js";

import urlSchema from "../schemas/urlSchema.js"

const urlsRouter = Router();

urlsRouter.post("/urls/shorten",
    sanitizeUrl,
    (req, res, next) => validateSchema(req, res, next, urlSchema),
    validateToken,
    shortenUrl
);

export default urlsRouter;