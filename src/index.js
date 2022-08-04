import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import urlsRouter from "./routes/urlsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import rankingRouter from "./routes/rankingRouter.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);
app.use(rankingRouter);

const PORT =  process.env.PORT || 4001;

app.listen(PORT, () => console.log(`servidor rodando na porta --> ${PORT}`));