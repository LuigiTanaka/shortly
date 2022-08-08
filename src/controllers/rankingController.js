import connection from "../dbStrategy/postgres.js";

export async function getRanking(req, res) {
    try {
        const { rows: ranking } = await connection.query(`
            SELECT 
                users.id, 
                users.name, 
                users."linksCount", 
                COALESCE(CAST(SUM(urls."visitCount") AS INT),0) AS "visitCount"
            FROM users LEFT JOIN urls
            ON urls."userId" = users.id
            GROUP BY users.id
            ORDER BY "visitCount" DESC, "linksCount" DESC
            LIMIT 10
        `);

        res.status(200).send(ranking);
    } catch (error) {
        res.status(500).send(error.message)
    }
}