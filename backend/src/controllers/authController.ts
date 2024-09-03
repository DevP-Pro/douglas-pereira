import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';

// Gerar token JWT
const generateToken = (id: string) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

// Registro de usuário
export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  user = new User({ email, password });
  await user.save();

  const token = generateToken(user.id);
  res.status(201).json({ token });
};

// Login de usuário
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user.id);
  res.status(200).json({ token });
};
