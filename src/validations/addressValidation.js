import Joi from 'joi';

export const addressSchema = Joi.object({
  name: Joi.string().max(100).allow(null, ''),
  customer_id: Joi.number().integer().required(),
  address: Joi.string().max(255).required(),
  location: Joi.string().max(255).allow(null, ''),
  district_id: Joi.number().integer().required(),
});