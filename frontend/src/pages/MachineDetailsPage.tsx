import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
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
  CssBaseline,
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../components/Sidebar";
import axios from "axios";

interface Monitoring {
  _id: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface Machine {
  name: string;
  type: string;
}

const MachineDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [monitorings, setMonitorings] = useState<Monitoring[]>([]);
  const [machine, setMachine] = useState<Machine | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Monitoring>('name');
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMonitoringsAndMachine = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // Fetch monitorings
        const response = await axios.get(
          `http://localhost:5000/api/machines/${id}/monitorings`,
          config
        );
        setMonitorings(response.data);

        // Fetch machine details
        const machineResponse = await axios.get(
          `http://localhost:5000/api/machines/${id}`,
          config
        );
        setMachine(machineResponse.data);
      } catch (error) {
        console.error("Erro ao buscar monitoramentos ou máquina:", error);
      }
    };

    fetchMonitoringsAndMachine();
  }, [id]);

  const handleAddMonitoring = () => {
    navigate(`/machines/${id}/add-monitoring`);
  };

  const handleEditMonitoring = (monitoringId: string) => {
    navigate(`/machines/${id}/monitorings/${monitoringId}/edit`);
  };

  const handleDeleteMonitoring = async (monitoringId: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token não encontrado");
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(
        `http://localhost:5000/api/machines/${id}/monitorings/${monitoringId}`,
        config
      );

      // Atualiza a lista de monitoramentos após a exclusão
      setMonitorings(
        monitorings.filter((monitoring) => monitoring._id !== monitoringId)
      );
    } catch (error) {
      console.error("Erro ao excluir monitoramento:", error);
    }
  };

  const handleViewMonitoring = (monitoringId: string) => {
    navigate(`/machines/${id}/monitorings/${monitoringId}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof Monitoring) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Filtrando os monitoramentos com base na consulta de busca
  const filteredMonitorings = monitorings.filter((monitoring) =>
    monitoring.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMonitorings = filteredMonitorings.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedMonitorings = sortedMonitorings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
            Detalhes da Máquina: {machine?.name} ({machine?.type})
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddMonitoring}
            sx={{ bgcolor: '#6366F1' }}
          >
            Novo Monitoramento
          </Button>
        </Box>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar monitoramento"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: "800px" }}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={order}
                      onClick={() => handleRequestSort('name')}
                    >
                      Nome do Ponto de Monitoramento
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'type'}
                      direction={order}
                      onClick={() => handleRequestSort('type')}
                    >
                      Modelo do sensor
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedMonitorings.map((monitoring, index) => (
                  <TableRow hover key={monitoring._id}>
                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell>{monitoring.name}</TableCell>
                    <TableCell>{monitoring.type}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="view"
                        onClick={() => handleViewMonitoring(monitoring._id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditMonitoring(monitoring._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteMonitoring(monitoring._id)}
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
            count={filteredMonitorings.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default MachineDetailsPage;
