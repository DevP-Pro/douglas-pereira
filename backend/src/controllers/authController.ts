import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Implementar lógica para verificar email e senha

  const token = generateToken('user_id');
  res.json({ token });
};

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Implementar lógica para registro de usuário

  const token = generateToken('user_id');
  res.json({ token });
};

export { loginUser, registerUser };
