import * as Address from '../models/addressModel.js';
import { addressSchema } from '../validations/addressValidation.js';
import { success, error } from '../utils/responseHandler.js';

export const createAddress = async (req, res, next) => {
  try {
    const { error: validationError, value } = addressSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const address = await Address.createAddress(value);
    return success(res, address, 'Address yaratildi', 201);
  } catch (err) {
    next(err);
  }
};

export const getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.getAllAddresses();
    return success(res, addresses);
  } catch (err) {
    next(err);
  }
};

export const getAddressById = async (req, res, next) => {
  try {
    const address = await Address.getAddressById(req.params.id);
    if (!address) return error(res, 'Address topilmadi', 404);
    return success(res, address);
  } catch (err) {
    next(err);
  }
};

export const getAddressesByCustomer = async (req, res, next) => {
  try {
    const addresses = await Address.getAddressesByCustomer(req.params.customer_id);
    return success(res, addresses);
  } catch (err) {
    next(err);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const { error: validationError, value } = addressSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const updated = await Address.updateAddress(req.params.id, value);
    if (!updated) return error(res, 'Address topilmadi', 404);
    return success(res, updated, 'Address yangilandi');
  } catch (err) {
    next(err);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    await Address.deleteAddress(req.params.id);
    return success(res, {}, 'Address ochirildi');
  } catch (err) {
    next(err);
  }
};