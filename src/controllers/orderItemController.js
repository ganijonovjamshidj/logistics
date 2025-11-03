import * as OrderItem from '../models/orderItemModel.js';
import { orderItemSchema } from '../validations/orderItemValidation.js';
import { success, error } from '../utils/responseHandler.js'

export const createOrderItem = async (req, res, next) => {
  try {
    const { error: validationError, value } = orderItemSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const item = await OrderItem.createOrderItem(value);
    return success(res, item, 'Buyurtma mahsuloti qoshildi', 201);
  } catch (err) {
    next(err);
  }
};

export const getOrderItemsByOrder = async (req, res, next) => {
  try {
    const items = await OrderItem.getOrderItemsByOrder(req.params.order_id);
    return success(res, items, 'Buyurtma mahsulotlari royxati');
  } catch (err) {
    next(err);
  }
};

export const updateOrderItem = async (req, res, next) => {
  try {
    const { error: validationError, value } = orderItemSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const updated = await OrderItem.updateOrderItem(req.params.id, value);
    if (!updated) return error(res, 'Buyurtma mahsuloti topilmadi', 404);
    return success(res, updated, 'Buyurtma mahsuloti yangilandi');
  } catch (err) {
    next(err);
  }
};

export const deleteOrderItem = async (req, res, next) => {
  try {
    await OrderItem.deleteOrderItem(req.params.id);
    return success(res, {}, 'Buyurtma mahsuloti ochirildi');
  } catch (err) {
    next(err);
  }
};