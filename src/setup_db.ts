import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function setup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    multipleStatements: true
  });

  console.log('--- Iniciando Configuración de Base de Datos ---');

  try {
    const sqlPath = path.join(__dirname, '../database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    await connection.query(sql);
    console.log('✅ Base de datos y tablas creadas/verificadas correctamente.');
  } catch (error: any) {
    console.error('❌ Error durante la configuración:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('⚠️ Sugerencia: Verifica tu usuario y contraseña en el archivo .env');
    }
  } finally {
    await connection.end();
  }
}

setup();
