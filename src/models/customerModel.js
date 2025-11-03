import pool from '../config/db.js';

export const createCustomer = async ({ name, phone }) => {
  const query = `INSERT INTO customers (name, phone) VALUES ($1, $2) RETURNING *`;
  const { rows } = await pool.query(query, [name, phone]);
  return rows[0];
};

export const getAllCustomers = async () => {
  const { rows } = await pool.query(`SELECT * FROM customers ORDER BY id DESC`);
  return rows;
};

export const getCustomerById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM customers WHERE id = $1`, [id]);
  return rows[0];
};

export const updateCustomer = async (id, { name, phone }) => {
  const { rows } = await pool.query(
    `UPDATE customers SET name = $1, phone = $2 WHERE id = $3 RETURNING *`,
    [name, phone, id]
  );
  return rows[0];
};

export const deleteCustomer = async (id) => {
  await pool.query(`DELETE FROM customers WHERE id = $1`, [id]);
  return true;
};