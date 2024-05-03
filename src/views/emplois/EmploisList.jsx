import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';

const EmploiList = () => {
  const [emplois, setEmplois] = useState([]);
  const [seances, setSeances] = useState([]);
  const { fil } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleOptimize = (id) => {
    navigate('/emplois/optimize/' + id);
  };

  const handleShowSeances = (id) => {
    navigate('/seances/' + id);
  };

  const handleShowTimetable = (id, sectionId) => {
    if (sectionId != null) {
      navigate('/emplois/timetable/' + id + '/' + sectionId);
    } else {
      navigate('/emplois/timetable/' + id);
    }
  };

  const columns = [
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
      field: 'optimize',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          {user.roles.some((role) => role.name === 'ROLE_ADMIN') && (
            <Button onClick={() => handleOptimize(params.row.id)} variant="contained">
              Optimiser
            </Button>
          )}
          <Button sx={{ px: 1 }} onClick={() => handleShowSeances(params.row.id)} color="info" variant="contained">
            Voir Seances
          </Button>
          <Button
            onClick={() => handleShowTimetable(params.row.id, params.row.section ? params.row.section.id : null)}
            color="warning"
            variant="contained"
          >
            Voir Emploi du temps
          </Button>
        </div>
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const seancesResponse = await axios.get(`http://localhost:8080/seances`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const groupesResponse = await axios.get(`http://localhost:8080/groupes`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userEmail = user.email;

        const userGroup = groupesResponse.data.find((group) => group.prepaStudents.some((student) => student.email === userEmail));

        console.log('This is the user group', userGroup);
        // Check if the user has the role of professor
        if (user.roles.some((role) => role.name === 'ROLE_PROFESSOR')) {
          // Filter the seances for the professor
          const professorSeances = seancesResponse.data.filter((seance) => seance.professor.username === user.username);
          setSeances(professorSeances);
          console.log(seances);

          // Fetch timetables only if seances are fetched
          if (professorSeances.length > 0) {
            const timetablesResponse = await axios.get(`http://localhost:8080/timetables/filiere/${fil}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const allEmplois = timetablesResponse.data;
            const filteredEmplois = allEmplois.filter((emp) => professorSeances.some((seance) => seance.timeTable.id === emp.id));
            setEmplois(filteredEmplois);
            console.log(filteredEmplois);
          }
        } else if (user.roles.some((role) => role.name === 'ROLE_ADMIN')) {
          // Fetch all timetables for admins
          const timetablesResponse = await axios.get(`http://localhost:8080/timetables/filiere/${fil}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const allEmplois = timetablesResponse.data;
          setEmplois(allEmplois);
          console.log(emplois);
        } else if (user.roles.some((role) => role.name === 'ROLE_ETUDIANT')) {
          try {
            const token = localStorage.getItem('token');
            const timetablesResponse = await axios.get(`http://localhost:8080/timetables`, {
              headers: { Authorization: `Bearer ${token}` }
            });

            console.log(timetablesResponse);

            const allEmplois = timetablesResponse.data;
            const filteredEmplois = [];

            for (const emp of allEmplois) {
              // Check if the timetable has a section associated with it
              if (emp.section) {
                console.log('This has a section');
                if (emp.section.id === userGroup.section.id) {
                  filteredEmplois.push(emp);
                  break; // exit loop if filtered timetable found
                }
              } else {
                console.log('This does not have a section');
                // Fetch ingStudents for the specific filiereSemestre associated with the current timetable
                const ingStudentsResponse = await axios.get(
                  `http://localhost:8080/ingStudents/admin/filiereSemestre/${emp.filiereSemestre.id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` }
                  }
                );

                console.log(ingStudentsResponse.data);

                // Check if there is a user with the same email as the connected user in the ingStudentsResponse
                if (ingStudentsResponse.data.some((ing) => ing.email === user.email)) {
                  console.log('Found this dude');
                  filteredEmplois.push(emp);
                  break; // exit loop if filtered timetable found
                }
              }
            }

            setEmplois(filteredEmplois);
            if (filteredEmplois.length > 0) {
              handleShowTimetable(filteredEmplois[0].id);
            } else {
              // Handle the case when filteredEmplois is empty, maybe show a message or perform some other action
              console.log('No filtered emplois found');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Liste des emplois</Card.Title>
          </Card.Header>
          <Card.Body>
            <DataGrid rows={emplois} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10]} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EmploiList;
