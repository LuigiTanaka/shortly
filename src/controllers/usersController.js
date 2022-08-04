import connection from "../dbStrategy/postgres.js";

export async function getUserData(req, res) {
    const userId = res.locals.userId;

    try {
        const { rows: user } = await connection.query(`
            SELECT users.id, users.name, SUM(urls."visitCount") as "visitCount" 
            FROM users JOIN urls
            ON urls."userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id
        `, [userId]);

        if (user.length === 0) {
            return res.status(404).send("usuário não encontrada");
        }

        const { rows: userUrls } = await connection.query(`SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1`, [userId]);

        res.status(200).send({ 
            ...user[0],
            shortenedUrls: userUrls 
        });
    } catch (error) {
        res.status(500).send("erro ao obter dados do usuário")
    }
}