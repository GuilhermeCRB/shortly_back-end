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

export async function getUrl(req, res) {
    const { id } = req.params;

    try {
        const urlQuery = await db.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id]);
        const url = urlQuery.rows[0];

        if (!url) return res.sendStatus(404);

        return res.status(200).send(url);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to get url by id."));
        return res.status(500).send(e);
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        // UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;
        const urlQuery = await db.query(`
            SELECT url FROM urls WHERE "shortUrl" = $1;
        `, [shortUrl]);
        if (urlQuery.rows.length === 0) return res.sendStatus(404);

        const { url } = urlQuery.rows[0];

        return res.redirect(url);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to redirect user to url."));
        return res.status(500).send(e);
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { userId } = res.locals;

    try {
        await db.query(`DELETE FROM urls WHERE id = $1 AND "userId" = $2`, [id, userId]);
        return res.sendStatus(204);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to redirect user to url."));
        return res.status(500).send(e);
    }
}