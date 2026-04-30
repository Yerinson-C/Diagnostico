import { Router } from 'express';
import { TemplateDiagnosticoController } from '../controllers/templateDiagnostico.controller';

const router = Router();
const controller = new TemplateDiagnosticoController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById); // Para probar la anidada, usar: /api/diagnostico/templates/1?includePreguntas=true
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/duplicate/:id', controller.duplicate);

export default router;
