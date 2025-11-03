import * as Staff from '../models/deliveryStaffModel.js';
import { deliveryStaffSchema } from '../validations/deliveryStaffValidation.js';
import { success, error } from '../utils/responseHandler.js';

export const createDeliveryStaff = async (req, res, next) => {
  try {
    const { error: validationError, value } = deliveryStaffSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const staff = await Staff.createDeliveryStaff(value);
    return success(res, staff, 'Yetkazib beruvchi muvaffaqiyatli qoshildi', 201);
  } catch (err) {
    next(err);
  }
};

export const getAllDeliveryStaff = async (req, res, next) => {
  try {
    const staff = await Staff.getAllDeliveryStaff();
    return success(res, staff, 'Barcha yetkazib beruvchilar royxati');
  } catch (err) {
    next(err);
  }
};

export const getDeliveryStaffById = async (req, res, next) => {
  try {
    const staff = await Staff.getDeliveryStaffById(req.params.id);
    if (!staff) return error(res, 'Yetkazib beruvchi topilmadi', 404);
    return success(res, staff);
  } catch (err) {
    next(err);
  }
};

export const updateDeliveryStaff = async (req, res, next) => {
  try {
    const { error: validationError, value } = deliveryStaffSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const updated = await Staff.updateDeliveryStaff(req.params.id, value);
    if (!updated) return error(res, 'Yetkazib beruvchi topilmadi', 404);
    return success(res, updated, 'Yetkazib beruvchi malumotlari yangilandi');
  } catch (err) {
    next(err);
  }
};

export const deleteDeliveryStaff = async (req, res, next) => {
  try {
    await Staff.deleteDeliveryStaff(req.params.id);
    return success(res, {}, 'Yetkazib beruvchi ochirildi');
  } catch (err) {
    next(err);
  }
};