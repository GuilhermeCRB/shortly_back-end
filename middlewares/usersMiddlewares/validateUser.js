import bcrypt from 'bcrypt';
import chalk from "chalk";

import db from "../../database/db.js";

export async function validateUser(req, res, next) {
    const user = res.locals.sanitizedObject;

    try {
        const userQuery = await db.query(`SELECT password, id FROM users WHERE email = $1`, [user.email]);
        const userFromDB = userQuery.rows[0];
        if (!userFromDB) return res.sendStatus(401);

        const isPasswordValid = bcrypt.compareSync(user.password, userFromDB.password);
        if (!isPasswordValid) return res.sendStatus(401);

        res.locals.user = {...user, id: userFromDB.id};

        next();
    } catch (e) {
        console.log(chalk.red.bold(`\nWARNING: fail to  validate email and/or password! \nError: \n`), e);
        res.status(500).send(e);
    }
}