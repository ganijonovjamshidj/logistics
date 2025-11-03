import express from 'express';
import * as waterProductController from '../controllers/waterProductController.js';

const router = express.Router();

router.post('/', waterProductController.createWaterProduct);
router.get('/', waterProductController.getAllWaterProducts);
router.get('/:id', waterProductController.getWaterProductById);
router.put('/:id', waterProductController.updateWaterProduct);
router.delete('/:id', waterProductController.deleteWaterProduct);

export default router;