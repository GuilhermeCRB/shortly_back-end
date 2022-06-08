import { Router } from "express";

import { validateToken } from "../middlewares/urlsMiddlewares/validateToken.js";
import { shortenUrl } from "../controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken, shortenUrl);

export default urlsRouter;