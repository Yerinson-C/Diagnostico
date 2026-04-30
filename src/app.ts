import express from "express";
import cors from "cors";
import apiRoutes from "./api/routes/index";
import { logger } from "./api/middlewares/logger.middleware";

const app = express();

// Middlewares globales
app.use(logger); // Middleware de log personalizado
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use("/api", apiRoutes);

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de Diagnósticos" });
});

export default app;
