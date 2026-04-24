import app from './app';
import { checkConnection } from './config/db';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Verificar conexión a la base de datos antes de iniciar
    await checkConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
