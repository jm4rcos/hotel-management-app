import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCheckIn = [
  body('roomId').isInt().withMessage('Room ID must be an integer'),
  body('guestId').isInt().withMessage('Guest ID must be an integer'),
  body('checkInDate').isISO8601().withMessage('Check-in date must be a valid date'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateCheckOut = [
  body('roomId').isInt().withMessage('Room ID must be an integer'),
  body('guestId').isInt().withMessage('Guest ID must be an integer'),
  body('checkOutDate').isISO8601().withMessage('Check-out date must be a valid date'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateRoomUpdate = [
  body('roomNumber').isInt().withMessage('Room number must be an integer'),
  body('type').isString().withMessage('Room type must be a string'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('status').isString().withMessage('Status must be a string'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];