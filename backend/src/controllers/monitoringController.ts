import asyncHandler from 'express-async-handler';
import Monitoring from '../models/monitoringModel';

// @desc Get monitorings for a machine
// @route GET /api/machines/:id/monitorings
// @access Private
const getMonitoringsForMachine = asyncHandler(async (req, res) => {
  const monitorings = await Monitoring.find({ machine: req.params.id });
  res.json(monitorings);
});

// @desc Add a monitoring for a machine
// @route POST /api/machines/:id/monitorings
// @access Private
const addMonitoring = asyncHandler(async (req, res) => {
  const { sensorType, reading } = req.body;

  const monitoring = new Monitoring({
    machine: req.params.id,
    sensorType,
    reading,
  });

  const createdMonitoring = await monitoring.save();
  res.status(201).json(createdMonitoring);
});

export { getMonitoringsForMachine, addMonitoring };
