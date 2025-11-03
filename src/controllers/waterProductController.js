import * as WaterProduct from '../models/waterProductModel.js';
import { waterProductSchema } from '../validations/waterProductValidation.js';
import { success, error } from '../utils/responseHandler.js';

export const createWaterProduct = async (req, res, next) => {
  try {
    const { error: validationError, value } = waterProductSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const product = await WaterProduct.createWaterProduct(value);
    return success(res, product, 'Water product yaratildi', 201);
  } catch (err) {
    next(err);
  }
};

export const getAllWaterProducts = async (req, res, next) => {
  try {
    const products = await WaterProduct.getAllWaterProducts();
    return success(res, products);
  } catch (err) {
    next(err);
  }
};

export const getWaterProductById = async (req, res, next) => {
  try {
    const product = await WaterProduct.getWaterProductById(req.params.id);
    if (!product) return error(res, 'Product topilmadi', 404);
    return success(res, product);
  } catch (err) {
    next(err);
  }
};

export const updateWaterProduct = async (req, res, next) => {
  try {
    const { error: validationError, value } = waterProductSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const updated = await WaterProduct.updateWaterProduct(req.params.id, value);
    if (!updated) return error(res, 'Product topilmadi', 404);
    return success(res, updated, 'Water product yangilandi');
  } catch (err) {
    next(err);
  }
};

export const deleteWaterProduct = async (req, res, next) => {
  try {
    await WaterProduct.deleteWaterProduct(req.params.id);
    return success(res, {}, 'Water product ochirildi');
  } catch (err) {
    next(err);
  }
};