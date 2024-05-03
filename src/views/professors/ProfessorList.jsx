import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ProfessorList = () => {
  const [professors, setProfessors] = useState([]);

  const navigate = useNavigate();

  const columns = [
    { field: 'firstName', headerName: 'Prénom', width: 130 },
    { field: 'lastName', headerName: 'Nom', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'telephone', headerName: 'Téléphone', width: 130 },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 500,
      renderCell: (params) => (
        <Col>
          <Button variant="contained" color="primary" onClick={() => handleUpdateStudent(params.row.id)}>
            Modifier
          </Button>
          <Button sx={{ ml: 1 }} variant="contained" color="info" onClick={() => handleAddWants(params.row.id)}>
            Ajouter voeux
          </Button>
          <Button sx={{ mx: 1 }} variant="contained" color="warning" onClick={() => handleDeleteStudent(params.row.id)}>
            Supprimer
          </Button>
        </Col>
      )
    }
  ];

  const handleNewStudent = () => {
    navigate('/professors/create');
  };

  const handleAddWants = (id) => {
    navigate('/professors/addWants/' + id);
  };

  const handleUpdateStudent = (id) => {
    navigate('/professors/update/' + id);
  };

  const handleDeleteStudent = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:8080/professors/' + id, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching Prepas:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/professors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfessors(response.data); // Update state with fetched data
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
              <Card.Title as="h5">Liste des étudiants du classe préparatoire</Card.Title>
            </Card.Header>
            <Card.Body>
              <Button sx={{ mb: 3 }} onClick={() => handleNewStudent()} variant="contained">
                Créer un nouveau professeur
              </Button>
              <DataGrid
                rows={professors}
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

export default ProfessorList;
