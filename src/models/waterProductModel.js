import pool from '../config/db.js';

export const createWaterProduct = async ({ name, volume_liters, price }) => {
  const query = `
    INSERT INTO water_products (name, volume_liters, price)
    VALUES ($1, $2, $3) RETURNING *`;
  const { rows } = await pool.query(query, [name, volume_liters, price]);
  return rows[0];
};

export const getAllWaterProducts = async () => {
  const { rows } = await pool.query(`SELECT * FROM water_products ORDER BY id DESC`);
  return rows;
};

export const getWaterProductById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM water_products WHERE id = $1`, [id]);
  return rows[0];
};

export const updateWaterProduct = async (id, { name, volume_liters, price }) => {
  const { rows } = await pool.query(
    `UPDATE water_products SET name = $1, volume_liters = $2, price = $3 WHERE id = $4 RETURNING *`,
    [name, volume_liters, price, id]
  );
  return rows[0];
};

export const deleteWaterProduct = async (id) => {
  await pool.query(`DELETE FROM water_products WHERE id = $1`, [id]);
  return true;
};