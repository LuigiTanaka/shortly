import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!token || !id) {
            return res.status(401).send("token inválido");
        }
    
        res.locals.userId = id;
    
        next();
    } catch (error) {
        res.status(401).send("formato de token inválido")
    }
}