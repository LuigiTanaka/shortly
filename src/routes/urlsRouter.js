import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateUrl from "../middlewares/validateUrl.js";
import { shortUrl, getUrlById, openUrl, deleteUrl } from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten", validateToken, validateUrl, shortUrl);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", openUrl);
router.delete("/urls/:id", validateToken, deleteUrl)

export default router;