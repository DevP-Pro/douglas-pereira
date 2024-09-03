import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const AddSensorPage = () => {
  const { id, monitoringId } = useParams<{ id: string; monitoringId: string }>();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [type, setType] = useState(''); // Certifique-se de que este campo está sendo usado
  const [value, setValue] = useState('');

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
        type,  // Certifique-se de que o campo type está sendo enviado
        value,
        monitoring: monitoringId,
      };
      console.log("Dados Sensor",sensorData)
      const response = await axios.post(
        `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}/sensors`,
        sensorData,
        config
      );

      console.log('Sensor created:', response.data);
      navigate(`/machines/${id}/monitorings/${monitoringId}`);
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
          <TextField
            fullWidth
            label="Sensor Name"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Sensor Type"
            margin="normal"
            variant="outlined"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            fullWidth
            label="Sensor Value"
            margin="normal"
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            Save Sensor
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddSensorPage;
