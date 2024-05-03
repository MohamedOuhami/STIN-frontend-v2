import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ModuleList = () => {
  const [modules, SetModules] = useState([]);

  const navigate = useNavigate();

  const handleNewModule = () => {
    navigate('/modules/create');
  };

  const handleUpdateModule = (id) => {
    navigate('/modules/update/' + id);
  };

  const handleDeleteModule = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Deleting module ' + id);

      const response = await axios.delete('http://localhost:8080/modules/' + id, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData(); // Call fetchData to refetch data after deletion
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting Salle:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Nom', width: 300 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'filiereSemestre',
      headerName: 'Filiere / Semestre',
      width: 200,
      renderCell: (params) => {
        return params.row.filiereSemestre
          ? `${params.row.filiereSemestre.filiere.name} - Semestre ${params.row.filiereSemestre.semestre.count}`
          : '';
      }
    },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 400,
      renderCell: (params) => (
        <Col>
          <Button variant="contained" color="primary" onClick={() => handleUpdateModule(params.row.id)}>
            Modifier
          </Button>
          <Button sx={{ mx: 1 }} variant="contained" color="warning" onClick={() => handleDeleteModule(params.row.id)}>
            Supprimer
          </Button>
        </Col>
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/modules', {
          headers: { Authorization: `Bearer ${token}` }
        });
        SetModules(response.data); // Update state with fetched data
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching Prepas:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Liste des modules</Card.Title>
            </Card.Header>
            <Card.Body>
              <Button sx={{ mb: 3 }} onClick={() => handleNewModule()} variant="contained">
                Créer un nouveau module
              </Button>
              <DataGrid
                rows={modules}
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

export default ModuleList;
