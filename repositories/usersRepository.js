import db from "../database/db.js";

async function sigUpUser(values){
    return db.query("INSERT INTO users(name, email, password) VALUES ($1, $2, $3)", values);
}

async function signInUser(values){
    return db.query(`INSERT INTO sessions("userId", token, "lastStatus") VALUES ($1, $2, $3)`, values);
}

async function getUserById(id){
    return db.query(`
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
}

async function getRanking(){
    return db.query(`
    SELECT 
        us.id, 
        us.name, 
        COUNT(ur.id) AS "linksCount", 
        COALESCE(SUM(ur."visitCount"), 0) AS "visitCount"
    FROM users us
    LEFT JOIN urls ur on ur."userId" = us.id
    GROUP BY us.id
    ORDER BY "visitCount" DESC
    LIMIT 10;
`);
}

export const userRepository = {
    sigUpUser,
    signInUser,
    getUserById,
    getRanking
}