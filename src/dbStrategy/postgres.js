import pkg, { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Poll } = pkg;

const connection = new Pool({
    
});

export default connection;