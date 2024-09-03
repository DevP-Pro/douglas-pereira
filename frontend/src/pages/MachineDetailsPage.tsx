import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import axios from "axios";
import Sidebar from "../components/Sidebar";

interface Monitoring {
  _id: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
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
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          `http://localhost:5000/api/machines/${id}/monitorings`,
          config
        );
        setMonitorings(response.data);
        console.info(response.data);
      } catch (error) {
        console.error("Erro ao buscar monitoramentos:", error);
      }
    };

    fetchMonitorings();
  }, [id]);

  const handleAddMonitoring = () => {
    navigate(`/machines/${id}/add-monitoring`);
  };

  const handleEditMonitoring = (monitoringId: string) => {
    navigate(`/machines/${id}/monitorings/${monitoringId}/edit`);
  };

  // Função para apagar o monitoramento
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
    console.log(`Visualizar detalhes do monitoramento: ${monitoringId}`);
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

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: "800px" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Tipo de Sensor</TableCell>
                  <TableCell>Leitura</TableCell>
                  <TableCell>Data/Hora</TableCell>
                  <TableCell>Ações</TableCell>{" "}
                  {/* Coluna para os botões de ação */}
                </TableRow>
              </TableHead>
              <TableBody>
                {monitorings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((monitoring) => (
                    <TableRow key={monitoring._id}>
                      <TableCell>{monitoring.name}</TableCell>
                      <TableCell>{monitoring.type}</TableCell>
                      <TableCell>
                        {new Date(monitoring.updatedAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
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
