import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, (req, res) => {
  res.send('User profile');
});

export default router;
