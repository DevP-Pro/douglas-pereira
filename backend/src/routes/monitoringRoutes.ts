import express from 'express';
import { getMonitoringsForMachine, addMonitoring } from '../controllers/monitoringController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router({ mergeParams: true });

router.route('/').get(protect, getMonitoringsForMachine);
router.route('/').post(protect, addMonitoring);

export default router;
