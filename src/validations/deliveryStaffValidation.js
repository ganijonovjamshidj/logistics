import Joi from 'joi';

export const deliveryStaffSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(/^[0-9+()-\s]+$/).min(7).max(20).required(),
  vehicle_number: Joi.string().max(50).allow(null, ''),
  district_id: Joi.number().integer().required(),
});