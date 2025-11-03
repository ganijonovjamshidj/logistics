import express from 'express';
import * as orderItemController from '../controllers/orderItemController.js';

const router = express.Router();

router.post('/', orderItemController.createOrderItem);
router.get('/:order_id', orderItemController.getOrderItemsByOrder);
router.put('/:id', orderItemController.updateOrderItem);
router.delete('/:id', orderItemController.deleteOrderItem);

export default router;