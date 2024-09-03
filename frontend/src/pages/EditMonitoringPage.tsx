import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline, MenuItem } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const sensorModels = ["TcAg", "TcAs", "HF+"];

const EditMonitoringPage = () => {
  const { id, monitoringId } = useParams<{ id: string; monitoringId: string }>();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [filteredSensorModels, setFilteredSensorModels] = useState<string[]>(sensorModels);
  const [machineType, setMachineType] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonitoringDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}`,
          config
        );
        const { name, type } = response.data;
        setName(name);
        setType(type);

        // Fetch machine details to apply filtering based on machine type
        const machineResponse = await axios.get(`http://localhost:5000/api/machines/${id}`, config);
        const machine = machineResponse.data;
        setMachineType(machine.type);

        if (machine.type === "Bomba") {
          setFilteredSensorModels(sensorModels.filter(model => model !== "TcAg" && model !== "TcAs"));
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do monitoramento:', error);
      }
    };

    fetchMonitoringDetails();
  }, [id, monitoringId]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const monitoringData = {
        name,
        type,
      };

      const response = await axios.put(
        `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}`,
        monitoringData,
        config
      );

      console.log('Monitoring updated:', response.data);
      navigate(`/machines/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar monitoramento:', error);
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
            value={type}
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
            Salvar Monitoramento
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

export default EditMonitoringPage;
