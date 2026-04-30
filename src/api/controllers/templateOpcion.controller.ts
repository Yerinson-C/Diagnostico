import { Request, Response, NextFunction } from 'express';
import { TemplateOpcionService } from '../../services/templateOpcion.service';

export class TemplateOpcionController {
  private service: TemplateOpcionService;

  constructor() {
    this.service = new TemplateOpcionService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const opciones = await this.service.getAllOpciones();
      res.json({ success: true, data: opciones });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const opcion = await this.service.getOpcionById(id);
      
      if (!opcion) {
         res.status(404).json({ success: false, message: 'Opción no encontrada' });
         return;
      }
      
      res.json({ success: true, data: opcion });
    } catch (error) {
      next(error);
    }
  };

  getByPreguntaId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const preguntaId = parseInt(req.params.preguntaId, 10);
      const opciones = await this.service.getOpcionesByPreguntaId(preguntaId);
      res.json({ success: true, data: opciones });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nuevaOpcion = await this.service.createOpcion(req.body);
      res.status(201).json({ success: true, data: nuevaOpcion });
    } catch (error: any) {
      if (error.message) {
         res.status(400).json({ success: false, message: error.message });
         return;
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const updatedOpcion = await this.service.updateOpcion(id, req.body);
      
      if (!updatedOpcion) {
         res.status(404).json({ success: false, message: 'Opción no encontrada para actualizar' });
         return;
      }
      
      res.json({ success: true, data: updatedOpcion });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await this.service.deleteOpcion(id);
      
      if (!deleted) {
         res.status(404).json({ success: false, message: 'Opción no encontrada para eliminar' });
         return;
      }
      
      res.json({ success: true, message: 'Opción eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  };
}
