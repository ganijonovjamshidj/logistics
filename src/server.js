import app from './app.js';
import dotenv from 'dotenv';
import { pool } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL bilan aloqa ornatildi');

    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (err) {
    console.error('Serverni ishga tushirishda xatolik:', err);
    process.exit(1);
  }
};

startServer();