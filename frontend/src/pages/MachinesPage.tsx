import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Machine {
  id: string;
  name: string;
  // Adicione outras propriedades aqui de acordo com sua necessidade
}

const MachinesPage: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/machines');
        // setMachines(response.data);
        console.log("Resposta","=>",response.data)
      } catch (error) {
        console.error('Failed to fetch machines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {machines.length > 0 ? (
        machines.map(machine => (
          <div key={machine.id}>
            {machine.name}
          </div>
        ))
      ) : (
        <p>No machines available.</p>
      )}
    </div>
  );
};

export default MachinesPage;
