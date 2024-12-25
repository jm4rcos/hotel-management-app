import { Router } from 'express';
import authRoutes from './authRoutes';
import roomRoutes from './roomRoutes';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});
router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);

export default router;