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

import path from "path";

// Rutas de la API
app.use("/api", apiRoutes);

// Servir frontend estático (ubicado en ../../../interfaz/dist relativo a dist/app.js)
const frontendPath = path.join(__dirname, "../../../interfaz/dist");
app.use(express.static(frontendPath));

// Cualquier otra petición que no sea de la API devuelve el index.html del frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

export default app;
