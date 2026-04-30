import { Request, Response, NextFunction } from 'express';
import { TemplateDiagnosticoService } from '../../services/templateDiagnostico.service';

export class TemplateDiagnosticoController {
  private service: TemplateDiagnosticoService;

  constructor() {
    this.service = new TemplateDiagnosticoService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const diagnosticos = await this.service.getAllDiagnosticos();
      res.json({ success: true, data: diagnosticos });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      
      // Si se envía el query parameter ?includePreguntas=true, hacemos la consulta anidada
      const includePreguntas = req.query.includePreguntas === 'true';
      
      let diagnostico;
      if (includePreguntas) {
        diagnostico = await this.service.getDiagnosticoWithPreguntas(id);
      } else {
        diagnostico = await this.service.getDiagnosticoById(id);
      }
      
      if (!diagnostico) {
         res.status(404).json({ success: false, message: 'Diagnóstico no encontrado' });
         return;
      }
      
      res.json({ success: true, data: diagnostico });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nuevoDiagnostico = await this.service.createDiagnostico(req.body);
      res.status(201).json({ success: true, data: nuevoDiagnostico });
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
      const updatedDiagnostico = await this.service.updateDiagnostico(id, req.body);
      
      if (!updatedDiagnostico) {
         res.status(404).json({ success: false, message: 'Diagnóstico no encontrado para actualizar' });
         return;
      }
      
      res.json({ success: true, data: updatedDiagnostico });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await this.service.deleteDiagnostico(id);
      
      if (!deleted) {
         res.status(404).json({ success: false, message: 'Diagnóstico no encontrado para eliminar' });
         return;
      }
      
      res.json({ success: true, message: 'Diagnóstico eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  };

  duplicate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const duplicated = await this.service.duplicateDiagnostico(id);
      
      if (!duplicated) {
        res.status(404).json({ success: false, message: 'Diagnóstico no encontrado para duplicar' });
        return;
      }
      
      res.status(201).json({ success: true, data: duplicated });
    } catch (error) {
      next(error);
    }
  };
}
