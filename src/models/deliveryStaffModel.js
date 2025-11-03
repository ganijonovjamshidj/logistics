import pool from '../config/db.js';

export const createDeliveryStaff = async ({ name, phone, vehicle_number, district_id }) => {
  const query = `
    INSERT INTO delivery_staff (name, phone, vehicle_number, district_id)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await pool.query(query, [name, phone, vehicle_number, district_id]);
  return rows[0];
};

export const getAllDeliveryStaff = async () => {
  const { rows } = await pool.query(`SELECT * FROM delivery_staff ORDER BY id DESC`);
  return rows;
};

export const getDeliveryStaffById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM delivery_staff WHERE id = $1`, [id]);
  return rows[0];
};

export const updateDeliveryStaff = async (id, { name, phone, vehicle_number, district_id }) => {
  const { rows } = await pool.query(
    `UPDATE delivery_staff SET name = $1, phone = $2, vehicle_number = $3, district_id = $4
     WHERE id = $5 RETURNING *`,
    [name, phone, vehicle_number, district_id, id]
  );
  return rows[0];
};

export const deleteDeliveryStaff = async (id) => {
  await pool.query(`DELETE FROM delivery_staff WHERE id = $1`, [id]);
  return true;
};