import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';



const EmploiList = () => {
  const [emplois, SetEmplois] = useState([]);
  const {fil} = useParams();
  const navigate = useNavigate();


  const handleOptimize = (id) => {
    navigate("/emplois/optimize/"+id);
  }

  const handleShowTimetable = (id) => {
    navigate("/emplois/timetable/"+id);
  }

  const columns = [
    {
      field: 'section',
      headerName: 'Section',
      width: 300,
      renderCell: (params) => {
        return params.row.section ? params.row.section.name + " - Semestre " + params.row.section.semestre.count : '';
      }
    },
    {
      field: 'filiereSemestre',
      headerName: 'Filiere / Semestre',
      width: 300,
      renderCell: (params) => {
        return params.row.filiereSemestre ? params.row.filiereSemestre.filiere.name + " - Semestre " + params.row.filiereSemestre.semestre.count : '';
      }
    },
    {
      field: 'optimize',
      headerName: 'Actions', // Changed the header name to Actions
      width: 400, // Increased the width to accommodate both buttons
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}> {/* Added space between buttons */}
          <Button onClick={() => handleOptimize(params.row.id)} variant="contained">Optimiser</Button>
          <Button onClick={() => handleShowTimetable(params.row.id)} variant="contained">Voir Emploi du temps</Button>
        </div>
      )
    }
    
    
  ];
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/timetables/filiere/'+fil, {
          headers: { Authorization: `Bearer ${token}` }
        });
        SetEmplois(response.data); // Update state with fetched data
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
              <Card.Title as="h5">Liste des emplois</Card.Title>
            </Card.Header>
            <Card.Body>
              <DataGrid
                rows={emplois}
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

export default EmploiList;
