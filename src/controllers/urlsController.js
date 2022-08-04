import connection from "../dbStrategy/postgres.js";
import { customAlphabet } from 'nanoid';
import dayjs from "dayjs";

export async function shortUrl(req, res) {
    const { url } = req.body;
    const userId = res.locals.userId;

    const nanoid = customAlphabet('1234567890abcdef', 8);
    const shortUrl = nanoid();

    try {
        const now = dayjs().format("YYYY-MM-DD");

        await connection.query(`
            INSERT INTO urls 
            ("userId", url, "shortUrl", "visitCount", "createdAt") 
            VALUES 
            ($1, $2, $3, $4, $5)
        `, [userId, url, shortUrl, 0, now]);

        await connection.query(`
            UPDATE users 
            SET "linksCount" = "linksCount" + 1  
            WHERE id=$1
        `, [userId]);

        res.status(201).send({ shortUrl });
    } catch (error) {
        res.status(500).send("erro ao criar shortUrl")
    }
}

export async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        const { rows: url } = await connection.query('SELECT id, "shortUrl", url FROM urls WHERE id = $1', [id]);

        if (url.length === 0) {
            return res.status(404).send("url não encontrada");
        }

        res.status(200).send(url[0]);
    } catch (error) {
        res.status(500).send("erro ao pegar url pelo id");
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const { rows: url } = await connection.query('SELECT url FROM urls WHERE "shortUrl" = $1', [shortUrl]);

        if (url.length === 0) {
            return res.status(404).send("url não encontrada");
        }

        await connection.query(`
            UPDATE urls 
            SET "visitCount" = "visitCount" + 1  
            WHERE "shortUrl" = $1
        `, [shortUrl]);

        res.redirect(`${url[0].url}`);
    } catch (error) {
        res.status(500).send("erro ao redirecionar para url original");
    }
}

export async function deleteUrl(req, res) {
    const { id: urlId } = req.params;
    const userId = res.locals.userId;
    
    try {
        const { rows: url } = await connection.query('SELECT * FROM urls WHERE id = $1', [urlId]);

        if (url.length === 0) {
            return res.status(404).send("url não encontrada");
        }

        if(url[0].userId !== userId) {
            return res.status(401).send("url não pertence ao usuário");
        }

        await connection.query(`DELETE FROM urls WHERE id = $1`, [urlId]);

        await connection.query(`
            UPDATE users 
            SET "linksCount" = "linksCount" - 1  
            WHERE id=$1
        `, [userId]);

        res.status(204).send("url deletada com sucesso!");
    } catch (error) {
        res.status(500).send("erro ao deletar url");
    }
}

