import Joi from 'joi';

export const paymentSchema = Joi.object({
  order_id: Joi.number().integer().required(),
  amount: Joi.number().precision(2).positive().required(),
  method: Joi.string().valid('cash', 'card', 'transfer', 'other').required(),
});