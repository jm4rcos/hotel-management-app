import { Request, Response } from 'express';
import RoomService from '../services/roomService';
import { HttpError } from '../middlewares/errorHandler';
import { ErrorService } from '../services';

export default class RoomController {
  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }
  

  public getAllRooms = async (req: Request, res: Response): Promise<void> => {
    try {
      const rooms = await this.roomService.getAllRooms();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public getRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const room = await this.roomService.getRoom(id);
      
      if (!room) {
        throw new HttpError(404, 'Room not found');
      }

      res.status(200).json(room);
    } catch (error) {
      ErrorService.handleError(error, res);
    }
  }

  public createRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        number,
        bedType,
        numberOfBeds,
        description,
        price
      } = req.body;

      // Validate required fields
      if (!number || !bedType || !numberOfBeds || !description || !price) {
        throw new HttpError(400, 'Missing required fields');
      }

      // Validate bedType
      if (!['SINGLE', 'DOUBLE', 'QUEEN', 'KING'].includes(bedType)) {
        throw new HttpError(400, 'Invalid bed type');
      }

      const result = await this.roomService.updateRoom(req.params.id, {
        number,
        bedType,
        numberOfBeds,
        description,
        price
      });

      res.status(201).json(result);
    } catch (error) {
      ErrorService.handleError(error, res);
    }
  }

  public updateRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validate bedType if provided
      if (updateData.bedType && !['SINGLE', 'DOUBLE', 'QUEEN', 'KING'].includes(updateData.bedType)) {
        throw new HttpError(400, 'Invalid bed type');
      }

      // Validate status if provided
      if (updateData.status && !['FREE', 'OCCUPIED', 'MAINTENANCE'].includes(updateData.status)) {
        throw new HttpError(400, 'Invalid room status');
      }

      const result = await this.roomService.updateRoom(id, updateData);
      res.status(200).json(result);
    } catch (error) {
      ErrorService.handleError(error, res);
    }
  }

  public deleteRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.roomService.deleteRoom(id);
      res.status(200).json(result);
    } catch (error) {
      ErrorService.handleError(error, res);
    }
  }

  // public async checkIn(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { roomId, guestId, userId, checkOutDate, totalPaid, notes } = req.body;

  //     // Validate required fields
  //     if (!roomId || !guestId || !userId || !totalPaid) {
  //       throw new HttpError(400, 'Missing required fields');
  //     }

  //     const result = await this.roomService.checkIn({
  //       roomId,
  //       guestId,
  //       userId,
  //       checkOutDate: checkOutDate ? new Date(checkOutDate) : undefined,
  //       totalPaid,
  //       notes
  //     });

  //     res.status(200).json(result);
  //   } catch (error) {
  //     ErrorService.handleError(error, res);
  //   }
  // }

  // public async checkOut(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { roomId, userId, additionalPayment } = req.body;

  //     if (!roomId || !userId) {
  //       throw new HttpError(400, 'Missing required fields');
  //     }

  //     const result = await this.roomService.checkOut(
  //       roomId,
  //       userId,
  //       additionalPayment
  //     );

  //     res.status(200).json(result);
  //   } catch (error) {
  //     ErrorService.handleError(error, res);
  //   }
  // }

  // public async getRoomHistory(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     const { startDate, endDate, includeGuest, includeUser } = req.query;

  //     const history = await this.roomService.getRoomHistory(id, {
  //       startDate: startDate ? new Date(startDate as string) : undefined,
  //       endDate: endDate ? new Date(endDate as string) : undefined,
  //       includeGuest: includeGuest === 'true',
  //       includeUser: includeUser === 'true'
  //     });

  //     res.status(200).json(history);
  //   } catch (error) {
  //     ErrorService.handleError(error, res);
  //   }
  // }

  // public async getRoomAvailability(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { startDate, endDate } = req.query;

  //     if (!startDate || !endDate) {
  //       throw new HttpError(400, 'Start date and end date are required');
  //     }

  //     const availableRooms = await this.roomService.getRoomAvailability(
  //       new Date(startDate as string),
  //       new Date(endDate as string)
  //     );

  //     res.status(200).json(availableRooms);
  //   } catch (error) {
  //     ErrorService.handleError(error, res);
  //   }
  // }
}
