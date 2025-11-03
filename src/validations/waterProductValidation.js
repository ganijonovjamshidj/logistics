import Joi from 'joi';

export const waterProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  volume_liters: Joi.number().precision(2).positive().required(),
  price: Joi.number().integer().positive().required(),
});