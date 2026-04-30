import { TemplateOpcion } from './templateOpcion.models';

export interface TemplatePregunta {
  id?: number;
  template_diagnostico_id?: number; // Relación con el diagnóstico padre
  pregunta: string;
  tipo: string; // ej: 'abierta', 'multiple', 'booleana'
  opciones?: any; // JSON o texto con las opciones si aplica (compatibilidad)
  opciones_detalladas?: TemplateOpcion[]; // Relación con la tabla templateOpcion
  created_at?: Date;
  updated_at?: Date;
}
