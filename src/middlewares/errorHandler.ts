import { Request, Response, NextFunction } from 'express';

interface Error {
    statusCode?: number;
    message?: string;
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

export class HttpError extends Error {
    constructor(public statusCode: number, message: string) {
      super(message);
      this.name = 'HttpError';
    }
  }
  