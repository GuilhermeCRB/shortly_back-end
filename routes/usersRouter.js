import { Router } from "express";

import { sanitizeUser } from "../middlewares/usersMiddlewares/sanitizeUser.js";
import { sanitizeSignIn } from "../middlewares/usersMiddlewares/sanitizeSignIn.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpUser,signInUser } from "../controllers/usersController.js";

import userSchema from "../schemas/userSchema.js";
import signInSchema from "../schemas/signInSchema.js";

const usersRouter = Router();

usersRouter.post("/signup", sanitizeUser, (req, res, next) => validateSchema(req, res, next, userSchema), signUpUser);
usersRouter.post("/signin", sanitizeSignIn, (req, res, next) => validateSchema(req, res, next, signInSchema), signInUser);

export default usersRouter;