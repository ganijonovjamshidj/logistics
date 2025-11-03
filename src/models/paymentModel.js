import pool from '../config/db.js';

export const createPayment = async ({ order_id, amount, method }) => {
  const query = `
    INSERT INTO payments (order_id, amount, method)
    VALUES ($1, $2, $3) RETURNING *`;
  const { rows } = await pool.query(query, [order_id, amount, method]);
  return rows[0];
};

export const getPaymentsByOrder = async (order_id) => {
  const { rows } = await pool.query(`SELECT * FROM payments WHERE order_id = $1`, [order_id]);
  return rows;
};

export const updatePayment = async (id, { amount, method }) => {
  const { rows } = await pool.query(
    `UPDATE payments SET amount = $1, method = $2 WHERE id = $3 RETURNING *`,
    [amount, method, id]
  );
  return rows[0];
};

export const deletePayment = async (id) => {
  await pool.query(`DELETE FROM payments WHERE id = $1`, [id]);
  return true;
};