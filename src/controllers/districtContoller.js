import * as District from '../models/districtModel.js';
import { districtSchema } from '../validations/districtValidation.js';
import { success, error } from '../utils/responseHandler.js';

export const createDistrict = async (req, res, next) => {
  try {
    const { error: validationError, value } = districtSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const district = await District.createDistrict(value);
    return success(res, district, 'District muvaffaqiyatli yaratildi', 201);
  } catch (err) {
    next(err);
  }
};

export const getAllDistricts = async (req, res, next) => {
  try {
    const districts = await District.getAllDistricts();
    return success(res, districts, 'All districts tanlandi');
  } catch (err) {
    next(err);
  }
};

export const getDistrictById = async (req, res, next) => {
  try {
    const district = await District.getDistrictById(req.params.id);
    if (!district) return error(res, 'District topilmadi', 404);
    return success(res, district);
  } catch (err) {
    next(err);
  }
};

export const updateDistrict = async (req, res, next) => {
  try {
    const { error: validationError, value } = districtSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const updated = await District.updateDistrict(req.params.id, value);
    if (!updated) return error(res, 'District topilmadi', 404);
    return success(res, updated, 'District muvaffaqiyatli yangilandi');
  } catch (err) {
    next(err);
  }
};

export const deleteDistrict = async (req, res, next) => {
  try {
    await District.deleteDistrict(req.params.id);
    return success(res, {}, 'District ochirildi');
  } catch (err) {
    next(err);
  }
};