import React, { useState, useEffect } from "react";
import axios from "axios";
import { MachinesTable } from "./MachinesTable"; // Ajuste o caminho conforme necessário
import { Button, TextField, Box, CssBaseline } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

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
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar máquinas:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredMachines = machines.filter((machine) =>
    machine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (id: string) => {
    navigate(`/machines/${id}`);
  };

  const handleDeleteMachine = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      await axios.delete(`http://localhost:5000/api/machines/${id}`, config);
  
      // Atualize a lista de máquinas após a exclusão
      setMachines(machines.filter(machine => machine._id !== id));
    } catch (error) {
      console.error('Erro ao excluir máquina:', error);
    }
  };

  const handleEditMachine = (id: string) => {
    navigate(`/machines/${id}/edit`);
  };
  

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
          <TextField
            label="Search machine"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/add-machine")}
          >
            Add Machine
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
    </Box>
  );
};

export default MachinesPage;
