import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const IngStudentsList = () => {
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  const columns = [
    { field: 'cin', headerName: 'CIN', width: 130 },
    { field: 'cne', headerName: 'CNE', width: 130 },
    { field: 'firstName', headerName: 'Prénom', width: 130 },
    { field: 'lastName', headerName: 'Nom', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'telephone', headerName: 'Téléphone', width: 130 },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 250,
      renderCell: (params) => (
        <Col>
          <Button variant="contained" color="primary" onClick={() => handleUpdateStudent(params.row.id)}>
            Modifier
          </Button>
          <Button sx={{mx:1}} variant="contained" color="warning" onClick={() => handleDeleteStudent(params.row.id)}>
            Supprimer
          </Button>
        </Col>
      )
    }
  ];

  const handleNewStudent = () => {
    navigate('/ingStudents/create');
  };

  const handleUpdateStudent = (id) => {
    navigate('/ingStudents/update/' + id);
  };

  const handleDeleteStudent = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:8080/ingStudents/admin/delete/'+id, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData()
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching Ings:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/ingStudents/admin/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching Ings:', error);
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
              <Card.Title as="h5">Liste des étudiants du cycle Ingenieur</Card.Title>
            </Card.Header>
            <Card.Body>
              <Button sx={{mb:3}} onClick={() => handleNewStudent()} variant="contained">
                Créer un nouvel étudiant
              </Button>
              <DataGrid
                rows={students}
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

export default IngStudentsList;
