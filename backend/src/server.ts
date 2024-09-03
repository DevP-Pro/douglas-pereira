import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import machineRoutes from './routes/machineRoutes';
import monitoringRoutes from './routes/monitoringRoutes';
import sensorRoutes from './routes/sensorRoutes'; // Certifique-se de que esta importação está correta
import { protect } from './middleware/authMiddleware';

dotenv.config();

connectDB(); // Conecta ao MongoDB usando a URI definida no .env

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/machines', machineRoutes); // Configure a rota para máquinas

app.use('/api/machines/:id/monitorings', protect, monitoringRoutes); // Configure a rota para monitoramentos

// Ajuste a rota dos sensores para lidar com rotas que incluem sensorId e rotas que não incluem
app.use('/api/machines/:id/monitorings/:monitoringId/sensors', protect, sensorRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
