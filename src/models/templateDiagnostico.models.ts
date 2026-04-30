import { TemplatePregunta } from './templatePregunta.models';

export interface TemplateDiagnostico {
  id?: number;
  nombre: string;
  descripcion?: string;
  preguntas?: TemplatePregunta[]; // Preguntas anidadas
  created_at?: Date;
  updated_at?: Date;
}
