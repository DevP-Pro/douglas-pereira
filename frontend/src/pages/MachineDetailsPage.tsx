import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';

import axios from 'axios';
import Sidebar from '../components/Sidebar';

interface Monitoring {
  _id: string;
  sensorType: string;
  reading: number;
  timestamp: string;
}

const MachineDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [monitorings, setMonitorings] = useState<Monitoring[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMonitorings = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(`http://localhost:5000/api/machines/${id}/monitorings`, config);
        setMonitorings(response.data);
      } catch (error) {
        console.error('Erro ao buscar monitoramentos:', error);
      }
    };

    fetchMonitorings();
  }, [id]);

  const handleAddMonitoring = () => {
    navigate(`/machines/${id}/add-monitoring`);
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
            Detalhes da Máquina
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMonitoring}
            sx={{ mb: 2 }}
          >
            Adicionar Monitoramento
          </Button>
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: '800px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Tipo de Sensor</TableCell>
                  <TableCell>Leitura</TableCell>
                  <TableCell>Data/Hora</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monitorings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((monitoring) => (
                    <TableRow key={monitoring._id}>
                      <TableCell>{monitoring.sensorType}</TableCell>
                      <TableCell>{monitoring.reading}</TableCell>
                      <TableCell>{new Date(monitoring.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
          <TablePagination
            component="div"
            count={monitorings.length}
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

export default MachineDetailsPage;
