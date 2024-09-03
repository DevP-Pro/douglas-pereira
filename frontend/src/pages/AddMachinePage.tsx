import React, { useState } from 'react';
import { Box, Button, TextField, Container, Paper, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const AddMachinePage = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Bomba');
  const [status, setStatus] = useState('Ativa');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const machineData = { name, type, status };
      await axios.post('http://localhost:5000/api/machines', machineData, config);

      navigate('/machines');
    } catch (error) {
      console.error('Erro ao criar máquina:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const machineTypes = [
    { value: 'Bomba', label: 'Bomba' },
    { value: 'Ventilador', label: 'Ventilador' },
  ];

  const machineStatuses = [
    { value: 'Ativa', label: 'Ativa' },
    { value: 'Inativa', label: 'Inativa' },
    { value: 'Em Manutenção', label: 'Em Manutenção' },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Adicionar Nova Máquina
          </Typography>
          <TextField
            fullWidth
            label="Nome da Máquina"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            select
            fullWidth
            label="Tipo de Máquina"
            value={type}
            onChange={(e) => setType(e.target.value)}
            margin="normal"
            variant="outlined"
          >
            {machineTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Status da Máquina"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
            variant="outlined"
          >
            {machineStatuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBack}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Criar Máquina
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddMachinePage;
