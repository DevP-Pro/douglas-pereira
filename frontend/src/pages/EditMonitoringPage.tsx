import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline, MenuItem, Container, Paper, Typography } from '@mui/material';
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
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb' }}>
      <CssBaseline />
      <Sidebar />
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
          <Typography variant="h6" component="h1" gutterBottom sx={{ color: '#3f51b5', fontWeight: 500 }}>
            Editar Ponto de Monitoramento
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ color: '#6b7280', marginBottom: 2 }}>
            Atualize as informações do ponto de monitoramento selecionado.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Nome do Ponto de Monitoramento"
              margin="normal"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
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
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{
                backgroundColor: '#6366f1',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#4f46e5',
                },
                textTransform: 'none',
                borderRadius: '8px',
              }}
            >
              Salvar Monitoramento
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
              sx={{
                borderColor: '#d1d5db',
                color: '#6b7280',
                textTransform: 'none',
                borderRadius: '8px',
              }}
            >
              Voltar
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditMonitoringPage;
