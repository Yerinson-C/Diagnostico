import mysql from "mysql2/promise";
import { config } from "./config";

export const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
});

export const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        connection.release();
    } catch (error) {
        console.error('❌ Error de conexión a la DB:', error);
        throw error;
    }
};