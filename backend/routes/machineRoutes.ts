import express from 'express';
import { getMachines, addMachine } from '../controllers/machineController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getMachines).post(protect, addMachine);

export default router;
