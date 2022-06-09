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

// export async function getUserById(req, res) {
//     const userId = req.params;
    
//     try {
//         await db.query(`
//             SELECT * FROM users us
//             JOIN urls ur ON us.id = ur.usersId
            
//         `);
//         return res.status(200).send(); 
//     } catch (e) {
//         console.log(chalk.red.bold("\nAn error occured while trying to get user by id."));
//         return res.status(500).send(e);
//     }
// }