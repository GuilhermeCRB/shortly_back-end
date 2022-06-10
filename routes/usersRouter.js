import { Router } from "express";

import { sanitizeUser } from "../middlewares/usersMiddlewares/sanitizeUser.js";
import { sanitizeSignIn } from "../middlewares/usersMiddlewares/sanitizeSignIn.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateUser } from "../middlewares/usersMiddlewares/validateUser.js";
import { validateToken } from "../middlewares/validateToken.js"
import { signUpUser, signInUser, getUserById } from "../controllers/usersController.js";

import userSchema from "../schemas/userSchema.js";
import signInSchema from "../schemas/signInSchema.js";

const usersRouter = Router();

usersRouter.post("/signup",
    sanitizeUser,
    (req, res, next) => validateSchema(req, res, next, userSchema),
    signUpUser
);

usersRouter.post("/signin",
    sanitizeSignIn,
    (req, res, next) => validateSchema(req, res, next, signInSchema),
    validateUser,
    signInUser
);

usersRouter.get("/users/:id", validateToken, getUserById);


export default usersRouter;