import * as Customer from '../models/customerModel.js';
import { customerSchema } from '../validations/customerValidation.js';
import { success, error } from '../utils/responseHandler.js';

export const createCustomer = async (req, res, next) => {
  try {
    const { error: validationError, value } = customerSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const customer = await Customer.createCustomer(value);
    return success(res, customer, 'Customer yaratildi', 201);
  } catch (err) {
    next(err);
  }
};

export const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.getAllCustomers();
    return success(res, customers);
  } catch (err) {
    next(err);
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.getCustomerById(req.params.id);
    if (!customer) return error(res, 'Customer topilmadi', 404);
    return success(res, customer);
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const { error: validationError, value } = customerSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const updated = await Customer.updateCustomer(req.params.id, value);
    if (!updated) return error(res, 'Customer topilmadi', 404);
    return success(res, updated, 'Customer yangilandi');
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    await Customer.deleteCustomer(req.params.id);
    return success(res, {}, 'Customer ochirildi');
  } catch (err) {
    next(err);
  }
};