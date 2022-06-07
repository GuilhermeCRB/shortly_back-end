import chalk from "chalk";

import db from "../database/db.js";

export async function signUpUser(req, res) {
    const user = req.body;
    const values = Object.values(user);
    values.pop();

    try {
        await db.query("INSERT INTO users(name, email, password) VALUES ($1, $2, $3)", values);
        return res.sendStatus(201);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to sign up user."));
        return res.status(500).send(e);
    }
}