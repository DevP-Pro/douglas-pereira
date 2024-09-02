import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import machineRoutes from './routes/machineRoutes';
import monitoringRoutes from './routes/monitoringRoutes';
import { protect } from './middleware/authMiddleware';

dotenv.config();

connectDB(); // Conecta ao MongoDB usando a URI definida no .env

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/machines', machineRoutes); // Configure a rota para máquinas

app.use('/api/machines/:id/monitorings', protect, monitoringRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
