import * as Payment from '../models/paymentModel.js';
import { paymentSchema } from '../validations/paymentValidation.js';
import { success, error } from '../utils/responseHandler.js';

export const createPayment = async (req, res, next) => {
  try {
    const { error: validationError, value } = paymentSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const payment = await Payment.createPayment(value);
    return success(res, payment, 'Tolov muvaffaqiyatli amalga oshirildi', 201);
  } catch (err) {
    next(err);
  }
};

export const getPaymentsByOrder = async (req, res, next) => {
  try {
    const payments = await Payment.getPaymentsByOrder(req.params.order_id);
    return success(res, payments, 'Buyurtmaga tegishli tolovlar royxati');
  } catch (err) {
    next(err);
  }
};

export const updatePayment = async (req, res, next) => {
  try {
    const { error: validationError, value } = paymentSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const updated = await Payment.updatePayment(req.params.id, value);
    if (!updated) return error(res, 'Tolov topilmadi', 404);
    return success(res, updated, 'Tolov malumotlari yangilandi');
  } catch (err) {
    next(err);
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    await Payment.deletePayment(req.params.id);
    return success(res, {}, 'Tolov ochirildi');
  } catch (err) {
    next(err);
  }
};