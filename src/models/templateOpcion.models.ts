export interface TemplateOpcion {
  id?: number;
  template_pregunta_id: number; // Relación con la pregunta padre
  opcion: string;
  valor?: number; // Valor numérico opcional (ej: para puntajes)
  created_at?: Date;
  updated_at?: Date;
}
