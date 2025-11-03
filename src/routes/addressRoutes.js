import express from 'express';
import * as addressController from '../controllers/addressController.js';

const router = express.Router();

router.post('/', addressController.createAddress);
router.get('/', addressController.getAllAddresses);
router.get('/:id', addressController.getAddressById);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

export default router;