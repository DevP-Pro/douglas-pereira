import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline, MenuItem } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const EditMachinePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState('Bomba');
  const [status, setStatus] = useState('Ativa');

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(`http://localhost:5000/api/machines/${id}`, config);
        const machine = response.data;
        setName(machine.name);
        setType(machine.type);
        setStatus(machine.status);
      } catch (error) {
        console.error('Erro ao buscar dados da máquina:', error);
      }
    };

    fetchMachineDetails();
  }, [id]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const machineData = { name, type, status };

      await axios.put(`http://localhost:5000/api/machines/${id}`, machineData, config);

      navigate(`/machines`);
    } catch (error) {
      console.error('Erro ao editar máquina:', error);
    }
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
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box component="form" sx={{ maxWidth: '500px', width: '100%' }}>
          <TextField
            fullWidth
            label="Nome da Máquina"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            fullWidth
            label="Tipo de Máquina"
            margin="normal"
            variant="outlined"
            value={type}
            onChange={(e) => setType(e.target.value)}
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
            margin="normal"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {machineStatuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
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
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditMachinePage;
