import asyncHandler from "express-async-handler";
import Machine from '../models/machineModel';
import Monitoring from "../models/monitoringModel";
import axios from 'axios';


// @desc Get all monitorings for a specific machine
// @route GET /api/monitorings/:machineId
// @access Private
const getMonitoringsForMachine = asyncHandler(async (req, res) => {
  const machineId = req.params.id; // Use 'id' se for assim que está na rota
  const monitorings = await Monitoring.find({ machine: machineId });

  if (monitorings.length > 0) {
    res.json(monitorings);
  } else {
    res.status(404);
    throw new Error("No monitorings found for this machine");
  }
});


// @desc Add a monitoring
// @route POST /api/machines/:machineId/monitorings
// @access Private
const addMonitoring = asyncHandler(async (req, res) => {
  try {
    const { name, type } = req.body;
    const machineId = req.params.id;
    console.log("Machine ID:", req.params); // Adiciona um log para verificar o ID

    const machine = await Machine.findById(machineId);

    if (!machine) {
      res.status(404);
      throw new Error("Machine not found");
    }

    const monitoring = new Monitoring({
      name,
      type,
      machine: machineId,
    });

    const createdMonitoring = await monitoring.save();
    res.status(201).json(createdMonitoring);
  } catch (error: unknown) {
    const typedError = error as any; // Faz o cast do erro para 'any'
    if (axios.isAxiosError(typedError)) {
      console.error(
        "Erro ao criar monitoramento:",
        typedError.response?.data || typedError.message
      );
    } else {
      console.error("Erro desconhecido:", typedError);
      res.status(500).json({ message: "Erro ao criar monitoramento" });
    }
  }
});

export { getMonitoringsForMachine, addMonitoring };
