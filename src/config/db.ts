import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de la base de datos usando variables de entorno o valores por defecto
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'aqualub_db',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear el pool de conexiones
export const pool = mysql.createPool(dbConfig);

// Función auxiliar para verificar la conexión
export const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    console.warn('⚠️ El servidor se iniciará, pero las peticiones a la base de datos fallarán hasta que configures las credenciales correctas.');
  }
};
