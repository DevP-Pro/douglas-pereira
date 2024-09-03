import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline, MenuItem } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const sensorStatusOptions = ["Ativo", "Inativo", "Em Manutenção"];

const EditSensorPage = () => {
  const { id, monitoringId, sensorId } = useParams<{ id: string; monitoringId: string; sensorId: string }>();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchSensorDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}/sensors/${sensorId}`,
          config
        );
        const { name, status } = response.data;
        setName(name);
        setStatus(status);
      } catch (error) {
        console.error('Erro ao buscar detalhes do sensor:', error);
      }
    };

    fetchSensorDetails();
  }, [id, monitoringId, sensorId]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const sensorData = {
        name,
        status,
      };

      await axios.put(
        `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}/sensors/${sensorId}`,
        sensorData,
        config
      );

      navigate(`/machines/${id}/monitorings/${monitoringId}`);
    } catch (error) {
      console.error('Erro ao atualizar sensor:', error);
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
            {sensorStatusOptions.map((option) => (
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
            Salvar
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={() => navigate(-1)} // Voltar para a página anterior
          >
            Voltar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditSensorPage;
