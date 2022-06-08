import chalk from "chalk";

import db from "../../database/db.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.status(401).send("Must send a token.");

    
    try {
        const sessionQuery = await db.query(`SELECT "userId" FROM sessions WHERE token = $1`, [token]);
        if (sessionQuery.rows.length === 0) return res.status(401).send("Token is invalid.");

        res.locals.userId = sessionQuery.rows[0].userId;

        next();
    } catch (e) {
        console.log(chalk.red.bold("Error when checking token."));
        return res.status(500).send(e);
    }
}