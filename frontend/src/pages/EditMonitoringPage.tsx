import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const EditMonitoringPage = () => {
  const { id, monitoringId } = useParams<{ id: string; monitoringId: string }>(); // Pegando os IDs da máquina e do monitoramento pela URL
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [type, setType] = useState('');

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
            label="Monitoring Name"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Monitoring Type"
            margin="normal"
            variant="outlined"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            Save Monitoring
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={() => navigate(-1)} // Voltar para a página anterior
          >
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditMonitoringPage;
