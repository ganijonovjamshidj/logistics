import express from 'express';
import * as districtController from '../controllers/districtController.js';

const router = express.Router();

router.post('/', districtController.createDistrict);
router.get('/', districtController.getAllDistricts);
router.get('/:id', districtController.getDistrictById);
router.put('/:id', districtController.updateDistrict);
router.delete('/:id', districtController.deleteDistrict);

export default router;