import { Router } from 'express';
import RoomController from '../controllers/roomController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateCheckIn, validateCheckOut, validateRoomUpdate } from '../middlewares/roomMiddleware';

const router = Router();
const roomController = new RoomController();

// Middleware para todas as rotas
router.use(authMiddleware);

// Rotas públicas (requer apenas autenticação)
router.get('/', roomController.getAllRooms);
router.get('/availability', roomController.getRoomAvailability);
router.get('/:id', roomController.getRoom);
router.get('/:id/history', roomController.getRoomHistory);

// Rotas de funcionário (requer autenticação)
router.post('/checkin', validateCheckIn, roomController.checkIn);
router.post('/checkout', validateCheckOut, roomController.checkOut);

// Rotas administrativas (requer role ADMIN)
// router.use(authorizeAdmin);
router.post('/', validateRoomUpdate, roomController.createRoom);
router.put('/:id', validateRoomUpdate, roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

// Exporta as rotas e também os middlewares para teste
export const middlewares = {
  validateCheckIn,
  validateCheckOut,
  validateRoomUpdate,
  // authenticateUser,
  // authorizeAdmin
};

export default router;