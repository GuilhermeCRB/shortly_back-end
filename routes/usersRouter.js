import { Router } from "express";

import { sanitizeUser } from "../middlewares/usersMiddlewares/sanitizeUser.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpUser } from "../controllers/usersController.js";

import userSchema from "../schemas/userSchema.js";

const usersRouter = Router();

usersRouter.post("/signup", sanitizeUser, (req, res, next) => validateSchema(req, res, next, userSchema), signUpUser);

export default usersRouter;