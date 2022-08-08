import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import connection from "../dbStrategy/postgres.js";
import dotenv from "dotenv";
import dayjs from "dayjs";

dotenv.config();

export async function signUp(req, res) {
    const newUser = req.body;
    const passwordHash = bcrypt.hashSync(newUser.password, 10);

    try {
        const result = await connection.query(`
            SELECT * FROM users WHERE email = $1
        `, [newUser.email]);

        if(result.rowCount > 0) {
            return res.status(409).send("email já cadastrado");
        }

        const now = dayjs().format("YYYY-MM-DD");

        await connection.query(`
            INSERT INTO users 
            (name, email, password, "linksCount", "createdAt") 
            VALUES 
            ($1, $2, $3, $4, $5)
        `, [newUser.name, newUser.email, passwordHash, 0, now]);

        res.status(201).send("usuário cadastrado com sucesso!");

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function signIn(req, res) {
    const loginUser = req.body;
    console.log(loginUser);

    try {
        const { rows: dbUserArray } = await connection.query(`SELECT *, "createdAt"::VARCHAR FROM users WHERE email = $1`, [loginUser.email]);

        if(dbUserArray.length === 0) {
            return res.status(401).send("senha ou email incorretos");
        }

        const dbUser = dbUserArray[0];

        const correctPassword = bcrypt.compareSync(loginUser.password, dbUser.password);

        if(!correctPassword) {
            return res.status(401).send("senha ou email incorretos");
        }

        const token = jwt.sign({ id: dbUser.id }, process.env.JWT_SECRET);

        delete dbUser.password;

        res.status(200).send({ user: { ...dbUser }, token });
    } catch (error) {
        res.status(500).send("erro ao logar usuário");
    }
}