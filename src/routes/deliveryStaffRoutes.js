import express from 'express';
import * as staffController from '../controllers/deliveryStaffController.js';

const router = express.Router();

router.post('/', staffController.createDeliveryStaff);
router.get('/', staffController.getAllDeliveryStaff);
router.get('/:id', staffController.getDeliveryStaffById);
router.put('/:id', staffController.updateDeliveryStaff);
router.delete('/:id', staffController.deleteDeliveryStaff);

export default router;