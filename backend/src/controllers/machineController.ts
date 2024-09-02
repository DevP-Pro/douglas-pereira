import asyncHandler from 'express-async-handler';
import Machine from '../models/machineModel';

// @desc Get all machines
// @route GET /api/machines
// @access Private
const getMachines = asyncHandler(async (req, res) => {
  const machines = await Machine.find({});
  res.json(machines);
});

// @desc Create a machine
// @route POST /api/machines
// @access Private
const createMachine = asyncHandler(async (req, res) => {
  const { name, status } = req.body;
  const machine = new Machine({ name, status });

  const createdMachine = await machine.save();
  res.status(201).json(createdMachine);
});

// @desc Get a machine by ID
// @route GET /api/machines/:id
// @access Private
const getMachineById = asyncHandler(async (req, res) => {
  const machine = await Machine.findById(req.params.id);

  if (machine) {
    res.json(machine);
  } else {
    res.status(404);
    throw new Error('Machine not found');
  }
});

// @desc Update a machine
// @route PUT /api/machines/:id
// @access Private
const updateMachine = asyncHandler(async (req, res) => {
  const { name, status } = req.body;

  const machine = await Machine.findById(req.params.id);

  if (machine) {
    machine.name = name;
    machine.status = status;

    const updatedMachine = await machine.save();
    res.json(updatedMachine);
  } else {
    res.status(404);
    throw new Error('Machine not found');
  }
});

export { getMachines, createMachine, getMachineById, updateMachine };
