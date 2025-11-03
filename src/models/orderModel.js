import pool from '../config/db.js';

export const createOrder = async ({ customer_id, delivery_staff_id, status }) => {
  const query = `
    INSERT INTO orders (customer_id, delivery_staff_id, status)
    VALUES ($1, $2, $3) RETURNING *`;
  const { rows } = await pool.query(query, [customer_id, delivery_staff_id, status]);
  return rows[0];
};

export const getAllOrders = async () => {
  const { rows } = await pool.query(`SELECT * FROM orders ORDER BY id DESC`);
  return rows;
};

export const getOrderById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM orders WHERE id = $1`, [id]);
  return rows[0];
};

export const updateOrder = async (id, { delivery_staff_id, status }) => {
  const query = `
    UPDATE orders SET delivery_staff_id = $1, status = $2 WHERE id = $3 RETURNING *`;
  const { rows } = await pool.query(query, [delivery_staff_id, status, id]);
  return rows[0];
};

export const deleteOrder = async (id) => {
  await pool.query(`DELETE FROM orders WHERE id = $1`, [id]);
  return true;
};
