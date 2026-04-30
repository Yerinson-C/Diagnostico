import { TemplateOpcion } from '../models/templateOpcion.models';
import { TemplateOpcionRepository } from '../repositories/templateOpcion.repository';

export class TemplateOpcionService {
  private repository: TemplateOpcionRepository;

  constructor() {
    this.repository = new TemplateOpcionRepository();
  }

  async getAllOpciones(): Promise<TemplateOpcion[]> {
    return await this.repository.findAll();
  }

  async getOpcionById(id: number): Promise<TemplateOpcion | null> {
    return await this.repository.findById(id);
  }

  async getOpcionesByPreguntaId(preguntaId: number): Promise<TemplateOpcion[]> {
    return await this.repository.findByPreguntaId(preguntaId);
  }

  async createOpcion(opcionData: TemplateOpcion): Promise<TemplateOpcion> {
    if (!opcionData.template_pregunta_id || !opcionData.opcion) {
      throw new Error("El id de la pregunta y el texto de la opción son obligatorios");
    }
    return await this.repository.create(opcionData);
  }

  async updateOpcion(id: number, opcionData: Partial<TemplateOpcion>): Promise<TemplateOpcion | null> {
    const updated = await this.repository.update(id, opcionData);
    if (!updated) return null;
    return await this.repository.findById(id);
  }

  async deleteOpcion(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
