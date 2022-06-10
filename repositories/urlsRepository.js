import db from "../database/db.js";

async function shortenUrl(values){
    return db.query(`INSERT INTO urls("userId", "shortUrl", url) VALUES ($1, $2, $3)`, values);
}

async function getUrl(id){
    return db.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id]);
}

async function openUrl(shortUrl){
    return db.query(`
            UPDATE urls SET "visitCount" = "visitCount" + 1 
            WHERE "shortUrl" = $1
            RETURNING url
    `, [shortUrl]);
}

async function deleteUrl(id,userId){
    return db.query(`DELETE FROM urls WHERE id = $1 AND "userId" = $2`, [id, userId]);
}

export const urlsRepository = {
    shortenUrl,
    getUrl,
    openUrl,
    deleteUrl
}