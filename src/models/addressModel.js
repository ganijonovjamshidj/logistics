import pool from '../config/db.js';

export const createAddress = async ({ name, customer_id, address, location, district_id }) => {
  const query = `
    INSERT INTO address (name, customer_id, address, location, district_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const { rows } = await pool.query(query, [name, customer_id, address, location, district_id]);
  return rows[0];
};

export const getAllAddresses = async () => {
  const { rows } = await pool.query(`SELECT * FROM address ORDER BY id DESC`);
  return rows;
};

export const getAddressById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM address WHERE id = $1`, [id]);
  return rows[0];
};

export const getAddressesByCustomer = async (customer_id) => {
  const { rows } = await pool.query(`SELECT * FROM address WHERE customer_id = $1`, [customer_id]);
  return rows;
};

export const updateAddress = async (id, { name, address, location, district_id }) => {
  const query = `
    UPDATE address
    SET name = $1, address = $2, location = $3, district_id = $4
    WHERE id = $5
    RETURNING *`;
  const { rows } = await pool.query(query, [name, address, location, district_id, id]);
  return rows[0];
};

export const deleteAddress = async (id) => {
  await pool.query(`DELETE FROM address WHERE id = $1`, [id]);
  return true;
};