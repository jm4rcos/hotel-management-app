import { Response } from 'express';
import { HttpError } from '../middlewares/errorHandler';

export default class ErrorService {
  public static handleError(error: unknown, res: Response): void {
    console.error('Error:', error);

    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    if (error instanceof Error) {
      // Map common errors to appropriate status codes
      if (error.message.includes('not found')) {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message.includes('already exists')) {
        res.status(409).json({ message: error.message });
        return;
      }
      if (error.message.includes('not available') || error.message.includes('not occupied')) {
        res.status(400).json({ message: error.message });
        return;
      }
    }

    res.status(500).json({ message: 'An unexpected error occurred' });
  }
}
