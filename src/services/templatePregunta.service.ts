import { TemplatePregunta } from '../models/templatePregunta.models';
import { TemplatePreguntaRepository } from '../repositories/templatePregunta.repository';

export class TemplatePreguntaService {
  private repository: TemplatePreguntaRepository;

  constructor() {
    this.repository = new TemplatePreguntaRepository();
  }

  async getAllPreguntas(): Promise<TemplatePregunta[]> {
    return await this.repository.findAll();
  }

  async getPreguntaById(id: number): Promise<TemplatePregunta | null> {
    return await this.repository.findById(id);
  }

  async createPregunta(preguntaData: TemplatePregunta): Promise<TemplatePregunta> {
    // Aquí se podrían agregar validaciones de negocio
    if (!preguntaData.pregunta || !preguntaData.tipo) {
      throw new Error("La pregunta y el tipo son obligatorios");
    }
    return await this.repository.create(preguntaData);
  }

  async updatePregunta(id: number, preguntaData: Partial<TemplatePregunta>): Promise<TemplatePregunta | null> {
    const updated = await this.repository.update(id, preguntaData);
    if (!updated) return null;
    return await this.repository.findById(id);
  }

  async deletePregunta(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
