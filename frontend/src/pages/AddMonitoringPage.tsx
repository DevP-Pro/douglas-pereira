import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const AddMonitoringPage = () => {
  const { machineId } = useParams<{ machineId: string }>(); // Pegando o ID da máquina pela URL
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Pega o token do localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho Authorization
        },
      };

      const monitoringData = {
        name,
        type,
        machine: machineId, // Relaciona o monitoramento à máquina
      };

      const response = await axios.post(
        `http://localhost:5000/api/machines/${machineId}/monitorings`,
        monitoringData,
        config
      );

      console.log('Monitoring created:', response.data);
      navigate(`/machines/${machineId}`); // Redireciona de volta para a página de detalhes da máquina
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

export default AddMonitoringPage;
