import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db'; // Certifique-se que o caminho está correto
import authRoutes from './routes/authRoutes'; // Importando as rotas de autenticação

dotenv.config();

connectDB(); // Conecta ao MongoDB usando a URI definida no .env

const app = express();

app.use(cors());
app.use(express.json());

// Configurando as rotas de autenticação
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => { 
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
