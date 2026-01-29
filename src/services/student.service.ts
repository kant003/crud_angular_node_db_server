import { pool } from '../config/db';
import { Student } from '../types/student';
import { RowDataPacket } from 'mysql2/promise';

export const getStudents = async (search?: string): Promise<Student[]> => {
  let sql = 'SELECT * FROM students';
  const params: any[] = [];

  if (search) {
    sql += ' WHERE name LIKE ?';
    params.push(`%${search}%`);
  }

  sql += ' ORDER BY created_at DESC';

  const [rows] = await pool.query<RowDataPacket[]>(sql, params);
  return rows as Student[];
};

export const getStudentById = async (id: number): Promise<Student | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM students WHERE id = ?',
    [id]
  );
  return (rows as Student[])[0] ?? null;
};

export const createStudent = async (
  name: string,
  email: string,
  age: number
): Promise<number> => {
  const [result]: any = await pool.query(
    'INSERT INTO students (name, email, age) VALUES (?, ?, ?)',
    [name, email, age]
  );
  return result.insertId;
};

export const updateStudent = async (
  id: number,
  name: string,
  email: string,
  age: number
): Promise<boolean> => {
  const [result]: any = await pool.query(
    'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?',
    [name, email, age, id]
  );
  return result.affectedRows > 0;
};

export const deleteStudent = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.query(
    'DELETE FROM students WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
};
