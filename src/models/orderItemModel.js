import pool from '../config/db.js';

export const createOrderItem = async ({ order_id, product_id, quantity, total_price }) => {
  const query = `
    INSERT INTO order_items (order_id, product_id, quantity, total_price)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await pool.query(query, [order_id, product_id, quantity, total_price]);
  return rows[0];
};

export const getOrderItemsByOrder = async (order_id) => {
  const { rows } = await pool.query(`SELECT * FROM order_items WHERE order_id = $1`, [order_id]);
  return rows;
};

export const updateOrderItem = async (id, { quantity, total_price }) => {
  const { rows } = await pool.query(
    `UPDATE order_items SET quantity = $1, total_price = $2 WHERE id = $3 RETURNING *`,
    [quantity, total_price, id]
  );
  return rows[0];
};

export const deleteOrderItem = async (id) => {
  await pool.query(`DELETE FROM order_items WHERE id = $1`, [id]);
  return true;
};