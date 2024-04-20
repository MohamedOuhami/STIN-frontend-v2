import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';

const ModuleList = () => {
  const [modules, SetModules] = useState([]);

  const columns = [
    { field: 'name', headerName: 'Nom', width: 300 },
    { field: 'description', headerName: 'Description', width: 300 },
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
              <DataGrid
                rows={modules}
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

export default ModuleList;
