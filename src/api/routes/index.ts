import { Router } from "express";
import templateDiagnosticoRoutes from "./templateDiagnostico.routes";
import templatePreguntaRoutes from "./templatePregunta.routes";
import templateOpcionRoutes from "./templateOpcion.routes";

const router = Router();

router.use("/templates", templateDiagnosticoRoutes);
router.use("/preguntas", templatePreguntaRoutes);
router.use("/opciones", templateOpcionRoutes);

export default router;
