import Joi from 'joi';

export const orderSchema = Joi.object({
  customer_id: Joi.number().integer().required(),
  delivery_staff_id: Joi.number().integer().required(),
  status: Joi.string().valid('pending', 'delivered', 'cancelled', 'in_progress').default('pending'),
});