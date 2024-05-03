import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';

const SeanceList = () => {
  const [seances, SetSeances] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleAssignProfessor = (id) => {
    navigate('/seances/assign/' + id);
  };

  const handleCreateSeances = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `http://localhost:8080/seances/createSeances/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' // Set content type to application/json
          }
        }
      );
      fetchData();
      // Handle response
      console.log('Seances created successfully:', response.data);

      // Optionally, you can navigate to another page or perform other actions upon successful update
    } catch (error) {
      console.error('Error creating seances:', error);
    }
  };

  const getFrenchDay = (dayOfWeek) => {
    switch (dayOfWeek) {
      case 1:
        return 'Lundi';
      case 2:
        return 'Mardi';
      case 3:
        return 'Mercredi';
      case 4:
        return 'Jeudi';
      case 5:
        return 'Vendredi';
      case 6:
        return 'Samedi';
      default:
        return '';
    }
  };

  const columns = [
    {
      field: 'element',
      headerName: 'Element',
      width: 300,
      renderCell: (params) => (params.row.element ? params.row.element.name : 'Not assigned')
    },
    {
      field: 'salle',
      headerName: 'Salle',
      width: 300,
      renderCell: (params) => (params.row.salle ? params.row.salle.name : 'Not assigned')
    },
    { field: 'type', headerName: 'Type', width: 300 },
    {
      field: 'Jour',
      headerName: 'Jour',
      width: 300,
      renderCell: (params) => (params.row.timeSlot ? getFrenchDay(params.row.timeSlot.day_of_week) : 'Not assigned')
    },
    {
      field: 'heureDebut',
      headerName: 'Heure Debut',
      width: 300,
      renderCell: (params) => (params.row.timeSlot ? params.row.timeSlot.starTime : 'Not assigned')
    },
    {
      field: 'heureFin',
      headerName: 'Heure Fin',
      width: 300,
      renderCell: (params) => (params.row.timeSlot ? params.row.timeSlot.endTime : 'Not assigned')
    },
    {
      field: 'professor',
      headerName: 'Professeur',
      width: 300,
      renderCell: (params) => {
        const professor = params.row.professor;
        if (professor) {
          if (professor.type === 'Vacataire') {
            return params.row.vacataire_alias || 'Not assigned';
          } else {
            return professor.firstName + ' ' + professor.lastName;
          }
        } else {
          return 'Not assigned';
        }
      }
    },

    {
      field: 'timeTable',
      headerName: 'Emploi du temps',
      width: 300,
      renderCell: (params) =>
        params.row.timeTable
          ? params.row.timeTable.filiereSemestre.filiere.name +
            ' ' +
            "S" + params.row.timeTable.filiereSemestre.semestre.count +
            (params.row.timeTable.section ? ' ' + params.row.timeTable.section.name : '')
          : 'Not assigned'
    },    
    {
      field: 'Assign professors',
      headerName: 'Actions', // Changed the header name to Actions
      width: 300, // Increased the width to accommodate both buttons
      renderCell: (params) => (
        <div>
          {' '}
          {/* Wrapped buttons inside a div */}
          <Button onClick={() => handleAssignProfessor(params.row.id)} variant="contained">
            Affecter professeur
          </Button>
        </div>
      )
    }
  ];

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/seances/timeTable/' + id, {
        headers: { Authorization: `Bearer ${token}` }
      });
      SetSeances(response.data); // Update state with fetched data
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching Prepas:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Liste des seances</Card.Title>
            </Card.Header>
            <Card.Body>
              <Button sx={{ mb: 2 }} variant="contained" onClick={() => handleCreateSeances()}>
                Creer les seances
              </Button>
              <DataGrid
                rows={seances}
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

export default SeanceList;
