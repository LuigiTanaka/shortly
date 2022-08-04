import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { getUserData } from "../controllers/usersController.js";

const router = Router();

router.get("/users/me", validateToken, getUserData);

export default router;