import React, { useState, useEffect } from "react";
import axios from "axios";
import { MachinesTable } from "./MachinesTable"; // Ajuste o caminho conforme necessário
import {
  Button,
  TextField,
  Box,
  CssBaseline,
  Typography,
  InputAdornment,
  Breadcrumbs,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { Helmet } from "react-helmet-async";
import CustomBreadcrumbs from "../components/CustomBreadcrumbs";

interface Machine {
  _id: string;
  name: string;
  status: string;
  avatar?: string;
  createdAt: Date;
}

const MachinesPage = () => {
  const [machines, setMachines] = useState<Machine[]>([]); // Tipando o estado machines
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get<Machine[]>(
        "http://localhost:5000/api/machines",
        config
      );
      setMachines(response.data);
    } catch (error) {
      console.error("Erro ao buscar máquinas:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Função para filtrar as máquinas com base no texto de busca
  const filteredMachines = machines.filter((machine) =>
    machine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (id: string) => {
    navigate(`/machines/${id}`);
  };

  const handleDeleteMachine = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(`http://localhost:5000/api/machines/${id}`, config);

      // Atualize a lista de máquinas após a exclusão
      setMachines(machines.filter((machine) => machine._id !== id));
    } catch (error) {
      console.error("Erro ao excluir máquina:", error);
    }
  };

  const handleEditMachine = (id: string) => {
    navigate(`/machines/${id}/edit`);
  };

  const breadcrumbs = [
    { label: 'Máquinas' } // Último breadcrumb sem href
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Gerenciamento de Maquinas</title>
      </Helmet>
      
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <Divider />
      <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Máquinas
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar monitoramento"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none", // Desativa o outline
                },
              },
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              boxShadow: "3px 6px 11px rgba(0, 0, 0, 0.1)",
              width: "300px",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "none", // Desativa o outline quando o campo está focado
                },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/add-machine")}
            sx={{
              backgroundColor: "#6366f1",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#4f46e5",
              },
              borderRadius: "8px",
              textTransform: "none",
              padding: "8px 16px",
            }}
          >
            Nova Máquina
          </Button>
        </Box>
        <MachinesTable
          count={filteredMachines.length}
          rows={filteredMachines}
          page={0}
          rowsPerPage={5}
          onEdit={(id) => handleEditMachine(id)}
          onDelete={(id) => handleDeleteMachine(id)}
          onView={(id) => handleViewDetails(id)}
        />
      </Box>
    </MainLayout>
  );
};

export default MachinesPage;
