import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const ElementList = () => {
  const [elements, SetElements] = useState([]);

  const navigate = useNavigate()

  const handleUpdate = (id) => {
    navigate("/elements/edit/"+id);
  }

  const columns = [
    { field: 'name', headerName: 'Nom', width: 300 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'Professeur',
      headerName: 'Professeur',
      width: 300,
      renderCell: (params) => params.row.professor ? params.row.professor.firstName + ' ' + params.row.professor.lastName : ""
    },
    {
      field: 'Module',
      headerName: 'Module',
      width: 300,
      renderCell: (params) => params.row.module ? params.row.module.name : ""
    },
    { field: 'nbr_seances_per_week_Cours', headerName: 'Nombre de séances de Cours par semaine', width: 300 },
    { field: 'nbr_seances_per_week_TD', headerName: 'Nombre de séances de TD par semaine', width: 300 },
    { field: 'nbr_hours_Cours', headerName: "Nombre d'heures de Cours", width: 300 },
    { field: 'nbr_hours_TD', headerName: "Nombre d'heures de TD", width: 300 },
    {
      field: 'Affecter un professeur', // New column for update button
      headerName: 'Update', // Button column header
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleUpdate(params.row.id)} variant='contained' color='primary'>Modifier</Button> // Button element with onClick handler
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/elements', {
          headers: { Authorization: `Bearer ${token}` }
        });
        SetElements(response.data); // Update state with fetched data
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
              <Card.Title as="h5">Liste des elements</Card.Title>
            </Card.Header>
            <Card.Body>
              <DataGrid
                rows={elements}
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

export default ElementList;
