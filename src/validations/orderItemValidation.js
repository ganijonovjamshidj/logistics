import Joi from 'joi';

export const orderItemSchema = Joi.object({
  order_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  total_price: Joi.number().precision(2).required(),
});