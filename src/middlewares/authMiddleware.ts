import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

/**
 * Authentication middleware to verify JWT tokens in request headers
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {void | Response} Returns 401 if no token, 403 if invalid token, or calls next()
 * 
 * @example
 * // Usage in routes
 * router.get('/protected-route', authMiddleware, (req, res) => {
 *   // Route handler code
 * });
 * 
 * // Expected Authorization header
 * // Authorization: Bearer <token>
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        (req as any).user = decoded;
        next();
    });
};