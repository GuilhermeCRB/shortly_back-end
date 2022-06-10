import { nanoid } from 'nanoid';
import chalk from "chalk";

import { urlsRepository } from '../repositories/urlsRepository.js';

export async function shortenUrl(req, res) {
    const { userId } = res.locals;
    const { url } = res.locals.sanitizedObject;
    const shortUrl = nanoid();

    const values = [userId, shortUrl, url];

    try {
        await urlsRepository.shortenUrl(values);
        return res.status(201).send({ shortUrl });
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to save url."));
        return res.status(500).send(e);
    }
}

export async function getUrl(req, res) {
    const { id } = req.params;

    try {
        const urlQuery = await urlsRepository.getUrl(id);
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
        const urlQuery = await urlsRepository.openUrl(shortUrl);
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
        await urlsRepository.deleteUrl(id,userId);
        return res.sendStatus(204);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to redirect user to url."));
        return res.status(500).send(e);
    }
}