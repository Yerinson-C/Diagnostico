import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';
import { TemplateDiagnostico } from '../models/templateDiagnostico.models';
import { TemplatePreguntaRepository } from './templatePregunta.repository';
import { TemplateOpcionRepository } from './templateOpcion.repository';

export class TemplateDiagnosticoRepository {
  private preguntaRepository: TemplatePreguntaRepository;
  private opcionRepository: TemplateOpcionRepository;

  constructor() {
    this.preguntaRepository = new TemplatePreguntaRepository();
    this.opcionRepository = new TemplateOpcionRepository();
  }

  async findAll(): Promise<TemplateDiagnostico[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM templateDiagnostico');
    return rows as TemplateDiagnostico[];
  }

  async findById(id: number): Promise<TemplateDiagnostico | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM templateDiagnostico WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return rows[0] as TemplateDiagnostico;
  }

  // MÉTODO PARA CONSULTA ANIDADA
  async findByIdWithPreguntas(id: number): Promise<TemplateDiagnostico | null> {
    const diagnostico = await this.findById(id);
    if (!diagnostico) return null;

    const preguntas = await this.preguntaRepository.findByDiagnosticoIdWithOpciones(id);
    diagnostico.preguntas = preguntas;

    return diagnostico;
  }

  async create(diagnostico: TemplateDiagnostico): Promise<TemplateDiagnostico> {
    const { nombre, descripcion } = diagnostico;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO templateDiagnostico (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion || null]
    );
    return { id: result.insertId, ...diagnostico };
  }

  async update(id: number, diagnostico: Partial<TemplateDiagnostico>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    if (diagnostico.nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(diagnostico.nombre);
    }
    if (diagnostico.descripcion !== undefined) {
      fields.push('descripcion = ?');
      values.push(diagnostico.descripcion);
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE templateDiagnostico SET ${fields.join(', ')} WHERE id = ?`;
    
    const [result] = await pool.query<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM templateDiagnostico WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  async duplicate(id: number): Promise<TemplateDiagnostico | null> {
    // 1. Obtener el original con todo lo anidado
    const original = await this.findByIdWithPreguntas(id);
    if (!original) return null;

    // 2. Crear el nuevo diagnóstico (Copia)
    const nuevoDiagnostico = await this.create({
      nombre: `${original.nombre} (Copia)`,
      descripcion: original.descripcion
    });

    // 3. Duplicar preguntas y sus opciones
    if (original.preguntas && original.preguntas.length > 0) {
      for (const pregunta of original.preguntas) {
        const nuevaPregunta = await this.preguntaRepository.create({
          template_diagnostico_id: nuevoDiagnostico.id,
          pregunta: pregunta.pregunta,
          tipo: pregunta.tipo,
          opciones: pregunta.opciones
        });

        // Duplicar opciones detalladas si existen
        if (pregunta.opciones_detalladas && pregunta.opciones_detalladas.length > 0) {
          for (const opcion of pregunta.opciones_detalladas) {
            await this.opcionRepository.create({
              template_pregunta_id: nuevaPregunta.id!,
              opcion: opcion.opcion,
              valor: opcion.valor
            });
          }
        }
      }
    }

    return await this.findByIdWithPreguntas(nuevoDiagnostico.id!);
  }
}
