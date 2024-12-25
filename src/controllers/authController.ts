import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import AuthService from '../services/authService';
import { User } from '../types';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';
const tokenExpiration = '1h';

export default class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const userData: User = req.body;
            const user = await this.authService.register(userData);
            
            res.status(201).json({
                status: 'success',
                data: {
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    }
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error instanceof Error ? error.message : 'Registration failed'
            });
        }
    };

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body;
            const user = await this.authService.login(username, password);
    
            if (!user) {
                res.status(401).json({
                    status: 'error',
                    message: 'Invalid credentials'
                });
                return;
            }
    
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                secretKey,
                { expiresIn: tokenExpiration }
            );
    
            res.status(200).json({
                status: 'success',
                data: {
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    },
                    token
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error instanceof Error ? error.message : 'Login failed'
            });
        }
    };

    public recoverPassword = async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, newPassword } = req.body;
            const user = await this.authService.recoverPassword(username, newPassword);

            if (!user) {
                res.status(404).json({
                    status: 'error',
                    message: 'User not found'
                });
                return;
            }

            res.status(200).json({
                status: 'success',
                message: 'Password updated successfully'
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error instanceof Error ? error.message : 'Password recovery failed'
            });
        }
    };
}