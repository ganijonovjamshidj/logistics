import pool from '../config/db.js';

export const createDistrict = async ({ name }) => {
  const query = `INSERT INTO districts (name) VALUES ($1) RETURNING *`;
  const { rows } = await pool.query(query, [name]);
  return rows[0];
};

export const getAllDistricts = async () => {
  const { rows } = await pool.query(`SELECT * FROM districts ORDER BY id`);
  return rows;
};

export const getDistrictById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM districts WHERE id = $1`, [id]);
  return rows[0];
};

export const updateDistrict = async (id, { name }) => {
  const { rows } = await pool.query(
    `UPDATE districts SET name = $1 WHERE id = $2 RETURNING *`,
    [name, id]
  );
  return rows[0];
};

export const deleteDistrict = async (id) => {
  await pool.query(`DELETE FROM districts WHERE id = $1`, [id]);
  return true;
};