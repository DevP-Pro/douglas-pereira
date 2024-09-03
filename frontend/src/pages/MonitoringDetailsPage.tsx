import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import axios from 'axios';
import Sidebar from '../components/Sidebar';

interface Sensor {
  _id: string;
  name: string;
  type: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}

const MonitoringDetailsPage = () => {
  const { id, monitoringId } = useParams<{ id: string; monitoringId: string }>();
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}/sensors`,
          config
        );
        setSensors(response.data);
      } catch (error) {
        console.error('Erro ao buscar sensores:', error);
      }
    };

    fetchSensors();
  }, [monitoringId]);

  const handleAddSensor = () => {
    navigate(`/machines/${id}/monitorings/${monitoringId}/add-sensor`);
  };

  const handleEditSensor = (sensorId: string) => {
    navigate(`/machines/${id}/monitorings/${monitoringId}/sensors/${sensorId}/edit`);
  };
  
  
  const handleDeleteSensor = async (sensorId: string) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error("Token não encontrado");
      }
  
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      await axios.delete(
        `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}/sensors/${sensorId}`,
        config
      );
  
      // Atualiza a lista de sensores após a exclusão
      setSensors(sensors.filter(sensor => sensor._id !== sensorId));
    } catch (error) {
      console.error('Erro ao excluir sensor:', error);
    }
  };
  
  

  const handleViewSensor = (sensorId: string) => {
    console.log(`Visualizar detalhes do sensor: ${sensorId}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Detalhes do Monitoramento
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSensor}
            sx={{ mb: 2 }}
          >
            Adicionar Sensor
          </Button>
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: '800px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Nome do Sensor</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Data/Hora</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sensors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((sensor) => (
                    <TableRow key={sensor._id}>
                      <TableCell>{sensor.name}</TableCell>
                      <TableCell>{sensor.type}</TableCell>
                      <TableCell>{sensor.value}</TableCell>
                      <TableCell>{new Date(sensor.updatedAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditSensor(sensor._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteSensor(sensor._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
          <TablePagination
            component="div"
            count={sensors.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default MonitoringDetailsPage;
