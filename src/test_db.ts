import { pool, checkConnection } from './config/db';

async function test() {
  console.log('--- Probando Conexión ---');
  await checkConnection();

  try {
    const [tables] = await pool.query('SHOW TABLES');
    console.log('Tablas encontradas:', tables);
  } catch (error: any) {
    console.error('Error al consultar tablas:', error.message);
  } finally {
    await pool.end();
  }
}

test();
