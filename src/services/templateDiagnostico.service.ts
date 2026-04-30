import { TemplateDiagnostico } from '../models/templateDiagnostico.models';
import { TemplateDiagnosticoRepository } from '../repositories/templateDiagnostico.repository';

export class TemplateDiagnosticoService {
  private repository: TemplateDiagnosticoRepository;

  constructor() {
    this.repository = new TemplateDiagnosticoRepository();
  }

  async getAllDiagnosticos(): Promise<TemplateDiagnostico[]> {
    return await this.repository.findAll();
  }

  async getDiagnosticoById(id: number): Promise<TemplateDiagnostico | null> {
    return await this.repository.findById(id);
  }

  async getDiagnosticoWithPreguntas(id: number): Promise<TemplateDiagnostico | null> {
    return await this.repository.findByIdWithPreguntas(id);
  }

  async createDiagnostico(diagnosticoData: TemplateDiagnostico): Promise<TemplateDiagnostico> {
    if (!diagnosticoData.nombre) {
      throw new Error("El nombre del diagnóstico es obligatorio");
    }
    return await this.repository.create(diagnosticoData);
  }

  async updateDiagnostico(id: number, diagnosticoData: Partial<TemplateDiagnostico>): Promise<TemplateDiagnostico | null> {
    const updated = await this.repository.update(id, diagnosticoData);
    if (!updated) return null;
    return await this.repository.findById(id);
  }

  async deleteDiagnostico(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async duplicateDiagnostico(id: number): Promise<TemplateDiagnostico | null> {
    return await this.repository.duplicate(id);
  }
}
