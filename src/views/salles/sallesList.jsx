import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const SalleList = () => {
  const [salles, setSalles] = useState([]);

  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/salles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSalles(response.data); // Update state with fetched data
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching Salles:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Nom', width: 200 },
    { field: 'type', headerName: 'Type', width: 200 },
    { field: 'max_capacity', headerName: 'Capacite maximale', width: 200 },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 400,
      renderCell: (params) => (
        <Col>
          <Button variant="contained" color="primary" onClick={() => handleUpdateSalle(params.row.id)}>
            Modifier
          </Button>
          <Button sx={{ mx: 1 }} variant="contained" color="warning" onClick={() => handleDeleteSalle(params.row.id)}>
            Supprimer
          </Button>
        </Col>
      )
    }
  ];

  const handleNewSalle = () => {
    navigate('/salles/create');
  };

  const handleUpdateSalle = (id) => {
    navigate('/salles/update/' + id);
  };

  const handleDeleteSalle = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Deleting salle ' + id);

      const response = await axios.delete('http://localhost:8080/salles/' + id, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData(); // Call fetchData to refetch data after deletion
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting Salle:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Liste des salles</Card.Title>
            </Card.Header>
            <Card.Body>
              <Button sx={{ mb: 3 }} onClick={() => handleNewSalle()} variant="contained">
                Créer une nouvelle salle
              </Button>
              <DataGrid
                rows={salles}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 }
                  }
                }}
                pageSizeOptions={[5, 10]}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SalleList;
