import { Request, Response, NextFunction } from 'express';
import { TemplatePreguntaService } from '../../services/templatePregunta.service';

export class TemplatePreguntaController {
  private service: TemplatePreguntaService;

  constructor() {
    this.service = new TemplatePreguntaService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const preguntas = await this.service.getAllPreguntas();
      res.json({ success: true, data: preguntas });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const includeOpciones = req.query.includeOpciones === 'true';
      
      let pregunta;
      if (includeOpciones) {
        pregunta = await this.service.getPreguntaWithOpciones(id);
      } else {
        pregunta = await this.service.getPreguntaById(id);
      }
      
      if (!pregunta) {
         res.status(404).json({ success: false, message: 'Pregunta no encontrada' });
         return;
      }
      
      res.json({ success: true, data: pregunta });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nuevaPregunta = await this.service.createPregunta(req.body);
      res.status(201).json({ success: true, data: nuevaPregunta });
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
      const updatedPregunta = await this.service.updatePregunta(id, req.body);
      
      if (!updatedPregunta) {
         res.status(404).json({ success: false, message: 'Pregunta no encontrada para actualizar' });
         return;
      }
      
      res.json({ success: true, data: updatedPregunta });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await this.service.deletePregunta(id);
      
      if (!deleted) {
         res.status(404).json({ success: false, message: 'Pregunta no encontrada para eliminar' });
         return;
      }
      
      res.json({ success: true, message: 'Pregunta eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  };

  duplicate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const duplicated = await this.service.duplicatePregunta(id);
      
      if (!duplicated) {
        res.status(404).json({ success: false, message: 'Pregunta no encontrada para duplicar' });
        return;
      }
      
      res.status(201).json({ success: true, data: duplicated });
    } catch (error) {
      next(error);
    }
  };
}
