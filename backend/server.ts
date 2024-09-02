import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

// Conectar ao banco de dados
connectDB();

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
import authRoutes from './routes/authRoutes';
import machineRoutes from './routes/machineRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/machines', machineRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
