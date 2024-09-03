import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const EditMachinePage = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da máquina pela URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

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

      const machineData = { name, status };

      await axios.put(`http://localhost:5000/api/machines/${id}`, machineData, config);

      navigate(`/machines`); // Redireciona de volta para a lista de máquinas
    } catch (error) {
      console.error('Erro ao editar máquina:', error);
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
            label="Nome da Máquina"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Status da Máquina"
            margin="normal"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
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

export default EditMachinePage;
