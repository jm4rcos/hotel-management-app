import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();
const authController = new AuthController();

// Routes for authentication
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/recover-password', authController.recoverPassword);

export default router;