import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const EditSensorPage = () => {
  const { id, monitoringId, sensorId } = useParams<{ id: string; monitoringId: string; sensorId: string }>();
  const navigate = useNavigate();

  const [sensorType, setSensorType] = useState('');
  const [reading, setReading] = useState('');

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}/sensors/${sensorId}`,
          config
        );

        setSensorType(response.data.type);
        setReading(response.data.value.toString());
      } catch (error) {
        console.error('Erro ao buscar dados do sensor:', error);
      }
    };

    fetchSensorData();
  }, [id, monitoringId, sensorId]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const sensorData = {
        type: sensorType,
        value: parseFloat(reading),
      };

      const response = await axios.put(
        `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}/sensors/${sensorId}`,
        sensorData,
        config
      );

      console.log('Sensor updated:', response.data);
      navigate(`/machines/${id}/monitorings/${monitoringId}`);
    } catch (error) {
      console.error('Erro ao editar sensor:', error);
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
            label="Sensor Type"
            margin="normal"
            variant="outlined"
            value={sensorType}
            onChange={(e) => setSensorType(e.target.value)}
          />
          <TextField
            fullWidth
            label="Reading"
            margin="normal"
            variant="outlined"
            value={reading}
            onChange={(e) => setReading(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            Save Changes
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

export default EditSensorPage;
