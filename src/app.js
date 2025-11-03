import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import customerRoutes from './routes/customerRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import districtRoutes from './routes/districtRoutes.js';
import deliveryStaffRoutes from './routes/deliveryStaffRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import orderItemRoutes from './routes/orderItemRoutes.js';
import waterProductRoutes from './routes/waterProductRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/customers', customerRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/delivery-staff', deliveryStaffRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/water-products', waterProductRoutes);
app.use('/api/payments', paymentRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Water Delivery API ishlayapti!');
});

export default app;