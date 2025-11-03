import * as Order from '../models/orderModel.js';
import { orderSchema } from '../validations/orderValidation.js';
import { success, error } from '../utils/responseHandler.js';

export const createOrder = async (req, res, next) => {
  try {
    const { error: validationError, value } = orderSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const order = await Order.createOrder(value);
    return success(res, order, 'Buyurtma muvaffaqiyatli yaratildi', 201);
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.getAllOrders();
    return success(res, orders, 'Barcha buyurtmalar royxati');
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.getOrderById(req.params.id);
    if (!order) return error(res, 'Buyurtma topilmadi', 404);
    return success(res, order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { error: validationError, value } = orderSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const updated = await Order.updateOrder(req.params.id, value);
    if (!updated) return error(res, 'Buyurtma topilmadi', 404);
    return success(res, updated, 'Buyurtma yangilandi');
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    await Order.deleteOrder(req.params.id);
    return success(res, {}, 'Buyurtma ochirildi');
  } catch (err) {
    next(err);
  }
};