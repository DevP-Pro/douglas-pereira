import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db'; // Corrigindo o caminho para o db.ts

dotenv.config();

connectDB(); // Conecta ao MongoDB usando a URI definida no .env

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => { // Tipagem de req e res
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
