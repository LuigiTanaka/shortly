import connection from "../dbStrategy/postgres.js";

export async function getRanking(req, res) {
    try {
        

        res.status(200).send({});
    } catch (error) {
        res.status(500).send("erro ao obter dados do usuário")
    }
}