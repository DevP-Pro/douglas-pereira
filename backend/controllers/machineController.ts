import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Machine from '../models/machineModel';

// @desc    Get all machines
// @route   GET /api/machines
// @access  Private
const getMachines = asyncHandler(async (req: Request, res: Response) => {
  const machines = await Machine.find({});
  res.json(machines);
});

// @desc    Add a new machine
// @route   POST /api/machines
// @access  Private
const addMachine = asyncHandler(async (req: Request, res: Response) => {
  const { name, status } = req.body;

  const machine = new Machine({
    name,
    status,
  });

  const createdMachine = await machine.save();
  res.status(201).json(createdMachine);
});

export { getMachines, addMachine };
