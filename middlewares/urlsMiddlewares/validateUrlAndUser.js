import chalk from "chalk";

import db from "../../database/db.js";

export async function validateUrlAndUser(req, res, next) {
    const { userId } = res.locals;
    const { id } = req.params;

    try {
        const urlQuery = await db.query(`SELECT "userId" FROM urls WHERE id = $1`, [id]);
        
        if (urlQuery.rows.length === 0) return res.sendStatus(404);
        if (userId !== urlQuery.rows[0].userId) return res.sendStatus(401);

        next();
    } catch (e) {
        console.log(chalk.red.bold("Error while checking if url is from user."));
        return res.status(500).send(e);
    }
}