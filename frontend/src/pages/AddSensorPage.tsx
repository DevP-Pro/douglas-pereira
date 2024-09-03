import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline, MenuItem, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const statusOptions = ["Ativo", "Inativo", "Manutenção"];

const AddSensorPage = () => {
  const { id, monitoringId } = useParams<{ id: string; monitoringId: string }>(); // Pegando os IDs da máquina e do monitoramento pela URL
  const navigate = useNavigate();

  const [monitoringName, setMonitoringName] = useState('');
  const [sensorModel, setSensorModel] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

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
        setMonitoringName(name);
        setSensorModel(type); // Aqui, 'type' representa o modelo do sensor vinculado ao monitoramento
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const sensorData = {
        name,
        status,
        monitoring: monitoringId, // Relaciona o sensor ao monitoramento
      };

      const response = await axios.post(
        `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}/sensors`,
        sensorData,
        config
      );

      console.log('Sensor criado:', response.data);
      navigate(`/machines/${id}/monitorings/${monitoringId}`); // Redireciona de volta para a página de detalhes do monitoramento
    } catch (error) {
      console.error('Erro ao criar sensor:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box component="form" sx={{ maxWidth: '500px', width: '100%' }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            {monitoringName} - {sensorModel}
          </Typography>
          <TextField
            fullWidth
            label="Nome do Sensor"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            select
            label="Status do Sensor"
            margin="normal"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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
            Criar Sensor
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

export default AddSensorPage;
