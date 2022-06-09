import { nanoid } from 'nanoid';
import chalk from "chalk";

import db from "../database/db.js";

export async function shortenUrl(req, res) {
    const { userId } = res.locals;
    const url = res.locals.sanitizedObject;
    const shortUrl = nanoid();

    const values = [userId, shortUrl, url];

    try {
        await db.query(`INSERT INTO urls("userId", "shortUrl", url) VALUES ($1, $2, $3)`, values);
        return res.status(201).send({ shortUrl });
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to save url."));
        return res.status(500).send(e);
    }
}