import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';
import { TemplatePregunta } from '../models/templatePregunta.models';
import { TemplateOpcionRepository } from './templateOpcion.repository';

export class TemplatePreguntaRepository {
  private opcionRepository: TemplateOpcionRepository;

  constructor() {
    this.opcionRepository = new TemplateOpcionRepository();
  }
  
  async findAll(): Promise<TemplatePregunta[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM templatePregunta');
    return rows as TemplatePregunta[];
  }

  async findById(id: number): Promise<TemplatePregunta | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM templatePregunta WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return rows[0] as TemplatePregunta;
  }

  async findByDiagnosticoId(diagnosticoId: number): Promise<TemplatePregunta[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM templatePregunta WHERE template_diagnostico_id = ?', [diagnosticoId]);
    return rows as TemplatePregunta[];
  }

  async findByDiagnosticoIdWithOpciones(diagnosticoId: number): Promise<TemplatePregunta[]> {
    const preguntas = await this.findByDiagnosticoId(diagnosticoId);
    
    for (const pregunta of preguntas) {
      if (pregunta.id) {
        pregunta.opciones_detalladas = await this.opcionRepository.findByPreguntaId(pregunta.id);
      }
    }
    
    return preguntas;
  }

  async findByIdWithOpciones(id: number): Promise<TemplatePregunta | null> {
    const pregunta = await this.findById(id);
    if (!pregunta) return null;

    pregunta.opciones_detalladas = await this.opcionRepository.findByPreguntaId(id);
    return pregunta;
  }

  async create(pregunta: TemplatePregunta): Promise<TemplatePregunta> {
    const { template_diagnostico_id, pregunta: textoPregunta, tipo, opciones } = pregunta;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO templatePregunta (template_diagnostico_id, pregunta, tipo, opciones) VALUES (?, ?, ?, ?)',
      [template_diagnostico_id || null, textoPregunta, tipo, opciones ? JSON.stringify(opciones) : null]
    );
    return { id: result.insertId, ...pregunta };
  }

  async update(id: number, pregunta: Partial<TemplatePregunta>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    if (pregunta.template_diagnostico_id !== undefined) {
      fields.push('template_diagnostico_id = ?');
      values.push(pregunta.template_diagnostico_id);
    }
    if (pregunta.pregunta !== undefined) {
      fields.push('pregunta = ?');
      values.push(pregunta.pregunta);
    }
    if (pregunta.tipo !== undefined) {
      fields.push('tipo = ?');
      values.push(pregunta.tipo);
    }
    if (pregunta.opciones !== undefined) {
      fields.push('opciones = ?');
      values.push(pregunta.opciones ? JSON.stringify(pregunta.opciones) : null);
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE templatePregunta SET ${fields.join(', ')} WHERE id = ?`;
    
    const [result] = await pool.query<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM templatePregunta WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  async duplicate(id: number): Promise<TemplatePregunta | null> {
    // 1. Obtener la original con opciones
    const original = await this.findByIdWithOpciones(id);
    if (!original) return null;

    // 2. Crear la nueva pregunta
    const nuevaPregunta = await this.create({
      template_diagnostico_id: original.template_diagnostico_id,
      pregunta: `${original.pregunta} (Copia)`,
      tipo: original.tipo,
      opciones: original.opciones
    });

    // 3. Duplicar opciones detalladas
    if (original.opciones_detalladas && original.opciones_detalladas.length > 0) {
      for (const opcion of original.opciones_detalladas) {
        await this.opcionRepository.create({
          template_pregunta_id: nuevaPregunta.id!,
          opcion: opcion.opcion,
          valor: opcion.valor
        });
      }
    }

    return await this.findByIdWithOpciones(nuevaPregunta.id!);
  }
}
