export interface TemplatePregunta {
  id?: number;
  pregunta: string;
  tipo: string; // ej: 'abierta', 'multiple', 'booleana'
  opciones?: any; // JSON o texto con las opciones si aplica
  created_at?: Date;
  updated_at?: Date;
}
