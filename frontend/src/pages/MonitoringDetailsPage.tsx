import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TableSortLabel,
  AppBar,
  Toolbar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

interface Sensor {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
}

type Order = 'asc' | 'desc';

const MonitoringDetailsPage = () => {
  const { id, monitoringId } = useParams<{ id: string; monitoringId: string }>();
  const [monitoringName, setMonitoringName] = useState('');
  const [sensorType, setSensorType] = useState('');
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Sensor>('name');
  const navigate = useNavigate();

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
        setMonitoringName(response.data.name);
        setSensorType(response.data.type);
      } catch (error) {
        console.error('Erro ao buscar detalhes do monitoramento:', error);
      }
    };

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

    fetchMonitoringDetails();
    fetchSensors();
  }, [id, monitoringId]);

  const handleRequestSort = (property: keyof Sensor) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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

  const sortedSensors = [...sensors].sort((a, b) => {
    if (orderBy === 'createdAt') {
      return order === 'asc'
        ? new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime()
        : new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime();
    } else {
      return order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {monitoringName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {monitoringName} - {sensorType}
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
                  <TableCell>#</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      Nome do Sensor
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'status'}
                      direction={orderBy === 'status' ? order : 'asc'}
                      onClick={() => handleRequestSort('status')}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    Modelo do Sensor
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'createdAt'}
                      direction={orderBy === 'createdAt' ? order : 'asc'}
                      onClick={() => handleRequestSort('createdAt')}
                    >
                      Data/Hora
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedSensors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((sensor, index) => (
                    <TableRow hover key={sensor._id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{sensor.name}</TableCell>
                      <TableCell>{sensor.status}</TableCell>
                      <TableCell>{sensorType}</TableCell>
                      <TableCell>{new Date(sensor.createdAt).toLocaleString()}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="view"
                          onClick={() => handleViewSensor(sensor._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
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
