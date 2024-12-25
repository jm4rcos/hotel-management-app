import express from 'express';
import { json } from 'body-parser';
import authRoutes from './routes/authRoutes';
import roomRoutes from './routes/roomRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

app.use(errorHandler);

app.get('/api/health', (_, res) => {
    res.status(200).json({
      status: 'ok'
    });
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});