import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';
import { TemplateOpcion } from '../models/templateOpcion.models';

export class TemplateOpcionRepository {
  async findAll(): Promise<TemplateOpcion[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM templateOpcion');
    return rows as TemplateOpcion[];
  }

  async findById(id: number): Promise<TemplateOpcion | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM templateOpcion WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return rows[0] as TemplateOpcion;
  }

  async findByPreguntaId(preguntaId: number): Promise<TemplateOpcion[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM templateOpcion WHERE template_pregunta_id = ?', [preguntaId]);
    return rows as TemplateOpcion[];
  }

  async create(opcionData: TemplateOpcion): Promise<TemplateOpcion> {
    const { template_pregunta_id, opcion, valor } = opcionData;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO templateOpcion (template_pregunta_id, opcion, valor) VALUES (?, ?, ?)',
      [template_pregunta_id, opcion, valor ?? null]
    );
    return { id: result.insertId, ...opcionData };
  }

  async update(id: number, opcionData: Partial<TemplateOpcion>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    if (opcionData.opcion !== undefined) {
      fields.push('opcion = ?');
      values.push(opcionData.opcion);
    }
    if (opcionData.valor !== undefined) {
      fields.push('valor = ?');
      values.push(opcionData.valor);
    }
    if (opcionData.template_pregunta_id !== undefined) {
      fields.push('template_pregunta_id = ?');
      values.push(opcionData.template_pregunta_id);
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE templateOpcion SET ${fields.join(', ')} WHERE id = ?`;
    
    const [result] = await pool.query<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM templateOpcion WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  async deleteByPreguntaId(preguntaId: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM templateOpcion WHERE template_pregunta_id = ?', [preguntaId]);
    return result.affectedRows > 0;
  }
}
