import express from 'express';
import { loginUser, registerUser, getUserProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Rota para login
router.post('/login', loginUser);

// Rota para registro
router.post('/register', registerUser);

// Rota para obter o perfil do usuário autenticado
router.get('/profile', protect, getUserProfile);

export default router;
