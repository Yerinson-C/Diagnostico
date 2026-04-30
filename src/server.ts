import app from './app';
import { checkConnection } from './db';
import { config } from './config';

const PORT = config.port;

const startServer = async () => {
    try {
        // Verificar conexión a la base de datos antes de iniciar
        await checkConnection();
        console.log('✅ Base de datos conectada correctamente');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en puerto ${PORT} en modo ${config.env}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();
