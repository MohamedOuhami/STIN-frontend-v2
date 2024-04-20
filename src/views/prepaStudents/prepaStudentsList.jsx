import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';

const PrepaStudentsList = () => {
  const [students, setStudents] = useState([]);

  const columns = [
    { field: 'cin', headerName: 'CIN', width: 130 },
    { field: 'cne', headerName: 'CNE', width: 130 },
    { field: 'firstName', headerName: 'Prenom', width: 130 },
    { field: 'lastName', headerName: 'Nom', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'telephone', headerName: 'Telephone', width: 130 },


  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/prepaStudents', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(response.data); // Update state with fetched data
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
              <DataGrid
                rows={students}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 }
                  }
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PrepaStudentsList;
