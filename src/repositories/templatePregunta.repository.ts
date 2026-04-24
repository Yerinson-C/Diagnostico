import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';
import { TemplatePregunta } from '../models/templatePregunta.models';

export class TemplatePreguntaRepository {
  
  async findAll(): Promise<TemplatePregunta[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM templatePregunta');
    return rows as TemplatePregunta[];
  }

  async findById(id: number): Promise<TemplatePregunta | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM templatePregunta WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return rows[0] as TemplatePregunta;
  }

  async create(pregunta: TemplatePregunta): Promise<TemplatePregunta> {
    const { pregunta: textoPregunta, tipo, opciones } = pregunta;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO templatePregunta (pregunta, tipo, opciones) VALUES (?, ?, ?)',
      [textoPregunta, tipo, opciones ? JSON.stringify(opciones) : null]
    );
    return { id: result.insertId, ...pregunta };
  }

  async update(id: number, pregunta: Partial<TemplatePregunta>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

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
}
