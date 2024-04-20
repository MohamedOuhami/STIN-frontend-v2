import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';

const SalleList = () => {
  const [salles, SetSalles] = useState([]);

  const columns = [
    { field: 'name', headerName: 'Nom', width: 300 },
    { field: 'max_capacity', headerName: 'Capacite maximale', width: 300 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/salles', {
          headers: { Authorization: `Bearer ${token}` }
        });
        SetSalles(response.data); // Update state with fetched data
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
              <Card.Title as="h5">Liste des salles</Card.Title>
            </Card.Header>
            <Card.Body>
              <DataGrid
                rows={salles}
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

export default SalleList;
