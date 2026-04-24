import { Router } from 'express';
import { TemplatePreguntaController } from '../controllers/templatePregunta.controller';

const router = Router();
const controller = new TemplatePreguntaController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
