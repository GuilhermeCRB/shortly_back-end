import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import chalk from "chalk";

import db from "../database/db.js";

export async function signUpUser(req, res) {
    const user = res.locals.sanitizedObject;

    const SALT = 10;
    user.password = bcrypt.hashSync(user.password, SALT);
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

export async function signInUser(req, res) {
    const user = res.locals.sanitizedObject;

    const key = process.env.JWT_KEY
    const config = { expiresIn: 600 };
    const token = jwt.sign(user, key, config);
    const now = Date.now();

    const values = [user.id, token, now];

    try {
        await db.query(`INSERT INTO sessions("userId", token, "lastStatus") VALUES ($1, $2, $3)`, values);
        return res.status(200).send(token);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to sign in user."));
        return res.status(500).send(e);
    }
}

export async function getUserById(req, res) {
    const { id } = req.params;
    const tokenId = res.locals.userId;

    if(parseInt(id) !== tokenId) return res.sendStatus(401);

    try {
        const userDataQuery = await db.query(`
            SELECT 
                us.id, 
                us.name, 
                COALESCE(t.sum, 0) AS "visitCount", 
                ur.id AS "urlId", 
                ur."shortUrl", 
                ur.url, 
                ur."visitCount" AS "urlVisitCount"
            FROM (
                SELECT ur."userId", SUM("visitCount")
                FROM urls ur 
                GROUP BY ur."userId"
            ) t 
            RIGHT JOIN users us ON us.id = t."userId"
            LEFT JOIN urls ur ON ur."userId" = t."userId"
            WHERE us.id = $1;
        `, [id]);
        
        const userData = userDataQuery.rows;

        
        if(userData.length === 0) return res.sendStatus(404);
        
        return res.status(200).send( _mapUserDataArrayToObject(userData));
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to get user by id."));
        return res.status(500).send(e);
    }
}

function _mapUserDataArrayToObject(array) {
    let urlsArray = [];
    if (parseInt(array[0].visitCount) !== 0){
        urlsArray = array.map(row => {
            const { urlId, shortUrl, url, urlVisitCount } = row;
            return { 
                id: urlId, 
                shortUrl, 
                url, 
                visitCount: urlVisitCount 
            };
        });
    }
    
    return {
        id: array[0].id,
        name: array[0].name,
        visitCount: array[0].visitCount,
        shortenedUrls: urlsArray
    }
}