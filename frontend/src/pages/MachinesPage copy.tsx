import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';

interface Machine {
  _id: string;
  name: string;
  monitorCount: number;
}

const MachinesTable = () => {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get('http://localhost:5000/api/machines', config);
      setMachines(response.data);
    } catch (error) {
      console.error('Erro ao buscar máquinas:', error);
    }
  };

  const handleEdit = (id: string) => {
    // Redirecionar ou abrir um modal de edição
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.delete(`http://localhost:5000/api/machines/${id}`, config);
      fetchMachines(); // Atualizar a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar máquina:', error);
    }
  };

  const handleView = (id: string) => {
    // Redirecionar ou abrir um modal de detalhes
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Machines
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }} href="/machines/add">
          + Add
        </Button>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search machine"
          sx={{ mb: 3 }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Loop para exibir as máquinas aqui */}
              <TableRow>
                <TableCell>Machine 1</TableCell>
                <TableCell>12345</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <IconButton><Visibility /></IconButton>
                  <IconButton><Edit /></IconButton>
                  <IconButton><Delete /></IconButton>
                </TableCell>
              </TableRow>
              {/* Exemplo acima deve ser repetido conforme necessário */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );

  // return (
  //   <TableContainer component={Paper}>
  //     <Table>
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>ID</TableCell>
  //           <TableCell>Name</TableCell>
  //           <TableCell>Monitor Count</TableCell>
  //           <TableCell align="right">Actions</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {machines.map((machine) => (
  //           <TableRow key={machine._id}>
  //             <TableCell>{machine._id}</TableCell>
  //             <TableCell>{machine.name}</TableCell>
  //             <TableCell>{machine.monitorCount}</TableCell>
  //             <TableCell align="right">
  //               <Tooltip title="View">
  //                 <IconButton onClick={() => handleView(machine._id)}>
  //                   <Visibility />
  //                 </IconButton>
  //               </Tooltip>
  //               <Tooltip title="Edit">
  //                 <IconButton onClick={() => handleEdit(machine._id)}>
  //                   <Edit />
  //                 </IconButton>
  //               </Tooltip>
  //               <Tooltip title="Delete">
  //                 <IconButton onClick={() => handleDelete(machine._id)}>
  //                   <Delete />
  //                 </IconButton>
  //               </Tooltip>
  //             </TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // );
};

export default MachinesTable;
