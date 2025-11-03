import Joi from 'joi';

export const customerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(/^[0-9+()-\s]+$/).min(7).max(20).required(),
});