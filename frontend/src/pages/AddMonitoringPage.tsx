import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline, MenuItem } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const sensorModels = ["TcAg", "TcAs", "HF+"];

const AddMonitoringPage = () => {
  const { machineId } = useParams<{ machineId: string }>(); 
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [filteredSensorModels, setFilteredSensorModels] = useState<string[]>(sensorModels);
  const [machineType, setMachineType] = useState<string | null>(null);

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(`http://localhost:5000/api/machines/${machineId}`, config);
        const machine = response.data;
        setMachineType(machine.type);

        if (machine.type === "Bomba") {
          setFilteredSensorModels(sensorModels.filter(model => model !== "TcAg" && model !== "TcAs"));
        }
      } catch (error) {
        console.error('Erro ao buscar dados da máquina:', error);
      }
    };

    fetchMachineDetails();
  }, [machineId]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };

      const monitoringData = {
        name,
        type, 
        machine: machineId, 
      };

      const response = await axios.post(
        `http://localhost:5000/api/machines/${machineId}/monitorings`,
        monitoringData,
        config
      );

      console.log('Monitoring created:', response.data);
      navigate(`/machines/${machineId}`); 
    } catch (error) {
      console.error('Erro ao criar monitoramento:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box component="form" sx={{ maxWidth: '500px', width: '100%' }}>
          <TextField
            fullWidth
            label="Nome do Ponto de Monitoramento"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            select
            label="Modelo de Sensor"
            margin="normal"
            variant="outlined"
            value={type} // Usando 'type'
            onChange={(e) => setType(e.target.value)}
            required
          >
            {filteredSensorModels.map((model) => (
              <MenuItem key={model} value={model}>
                {model}
              </MenuItem>
            ))}
          </TextField>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            Criar Monitoramento
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddMonitoringPage;
