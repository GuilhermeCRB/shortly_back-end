import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import usersRouter from "./routes/usersRouter.js";
import urlsRouter from "./routes/urlsRouter.js";

const app = express();
dotenv.config()

app.use(json());
app.use(cors());

app.use(usersRouter);
app.use(urlsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(chalk.white.bold.bgGreenBright(`\n Application is running on port ${port}... \n`)));