import express from 'express';
import { json } from 'body-parser';
import authRoutes from './routes/authRoutes';
import roomRoutes from './routes/roomRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middleware
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;