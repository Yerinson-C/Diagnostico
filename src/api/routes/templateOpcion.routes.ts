import { Router } from 'express';
import { TemplateOpcionController } from '../controllers/templateOpcion.controller';

const router = Router();
const controller = new TemplateOpcionController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/pregunta/:preguntaId', controller.getByPreguntaId);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
