import express, { Application } from 'express';
import cors from 'cors';
import templatePreguntaRoutes from './api/routes/templatePregunta.routes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/diagnostico/template-preguntas', templatePreguntaRoutes);

// Rutas de prueba
app.get('/api/diagnostico', (req, res) => {
  res.json({ message: 'Bienvenido al Módulo de Diagnóstico' });
});

export default app;
