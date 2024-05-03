import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function CreateSeance() {
  const [professors, setProfessors] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [timeTable, setTimeTable] = useState({});
  console.log(user);

  const [seance, setSeance] = useState({
    professor: '',
    salle: '',
    element: '',
    type: '',
    timeSlot: '',
    vacataire_alias: ''
  });
  const [salles, setSalles] = useState([]);
  const [elements, setElements] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [showAlias, setShowAlias] = useState(false);

  const { timeTableIndex, cellIndex, sectionId } = useParams();

  const realCellIndex = parseInt(cellIndex) + 1;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const groupesResponse = await axios.get('http://localhost:8080/groupes/section/' + sectionId, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGroupes(groupesResponse.data);

        const professorsResponse = await axios.get('http://localhost:8080/professors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfessors(professorsResponse.data);

        try {
          const timeTableResponse = await axios.get('http://localhost:8080/timetables/' + timeTableIndex, {
            headers: { Authorization: `Bearer ${token}` }
          });

          // Extract data from the response
          const timeTableData = timeTableResponse.data;
          setTimeTable(timeTableData);
          console.log(timeTable);

          // Fetch elements only after setting the timeTable
          const elementsResponse = await axios.get('http://localhost:8080/elements', {
            headers: { Authorization: `Bearer ${token}` }
          });

          // Filter elements based on the condition
          const filteredElements = elementsResponse.data.filter((element) => {
            return (
              element.module && element.module.filiereSemestre && element.module.filiereSemestre.id === timeTableData.filiereSemestre.id
            );
          });

          // Set the filtered elements
          setElements(filteredElements);
        } catch (error) {
          console.error('Error fetching timetable or elements:', error);
        }

        const timeSlotsResponse = await axios.get('http://localhost:8080/timeslots', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTimeSlots(timeSlotsResponse.data);

        // Check if there's a professor with the same email as the user
        console.log('This is the user email', user.email);
        const activeProfessor = professorsResponse.data.find((professor) => professor.email === user.email);
        if (activeProfessor) {
          console.log('Active professor:', activeProfessor);
          // Set the professor attribute in seance to the professor's ID
          setSeance((prevSeance) => ({ ...prevSeance, professor: activeProfessor.id }));
        }

        const sallesResponse = await axios.get('http://localhost:8080/salles', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log();
        setSalles(sallesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateSeance = async () => {
    try {
      const token = localStorage.getItem('token');

      // Create a new seance object
      const newSeance = {
        professor: { id: seance.professor },
        salle: { id: seance.salle },
        element: { id: seance.element },
        type: seance.type,
        timeSlot: { id: realCellIndex },
        timeTable: { id: timeTableIndex },
        groupe: seance.groupe !== undefined ? { id: seance.groupe } : null,
        vacataire_alias: seance.vacataire_alias
      };

      console.log(newSeance);

      // Send the new seance data to the server to create it
      const response = await axios.post('http://localhost:8080/seances', newSeance, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('New seance created:', response.data);
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Error creating seance:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group className="mb-3" controlId="professor">
                      <Form.Label hidden={user.roles.some((role) => role.name === 'ROLE_PROFESSOR')}>Professeur</Form.Label>
                      <Form.Control
                        as="select"
                        name="professor"
                        hidden={user.roles.some((role) => role.name === 'ROLE_PROFESSOR')}
                        value={seance.professor}
                        onChange={(e) => {
                          setSeance({ ...seance, professor: e.target.value });

                          const selectedProfessor = professors.find((prof) => prof.id == e.target.value);
                          console.log(selectedProfessor);
                          setShowAlias(selectedProfessor && selectedProfessor.type === 'Vacataire');
                        }}
                      >
                        <option value="">Sélectionnez un professeur</option>
                        {/* Render options for admins */}
                        {professors.map((professor) => (
                          <option key={professor.id} value={professor.id}>
                            {professor.firstName} {professor.lastName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    {showAlias && (
                      <Form.Group className="mb-3">
                        <Form.Label>Nom du vacataire</Form.Label>
                        <Form.Control
                          onChange={(e) => setSeance({ ...seance, vacataire_alias: e.target.value })}
                          type="text"
                          placeholder="Entrer le nom du vacataire"
                        />
                      </Form.Group>
                    )}
                    {/* Add other form fields for salle, element, type, and timeSlot */}
                    <Form.Group className="mb-3" controlId="salle">
                      <Form.Label>Salle</Form.Label>
                      <Form.Control
                        as="select"
                        name="salle"
                        value={seance.salle}
                        onChange={(e) => setSeance({ ...seance, salle: e.target.value })}
                      >
                        <option value="">Sélectionnez une salle</option>
                        {salles.map((salle) => (
                          <option key={salle.id} value={salle.id}>
                            {salle.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    {/* New group */}
                    <Form.Group className="mb-3" controlId="element">
                      <Form.Label>Element</Form.Label>
                      <Form.Control
                        as="select"
                        name="element"
                        value={seance.element}
                        onChange={(e) => setSeance({ ...seance, element: e.target.value })}
                      >
                        <option value="">Sélectionnez un élément</option>
                        {elements.map((element) => (
                          <option key={element.id} value={element.id}>
                            {element.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="type">
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="type"
                        value={seance.type}
                        onChange={(e) => {
                          setSeance({ ...seance, type: e.target.value });
                          // If type is Cours, clear the groupes selection
                          // if (e.target.value === 'Cours') {
                          //   setSeance({ ...seance, groupe: null });
                          // }
                        }}
                      >
                        <option value="">Sélectionnez un type</option>
                        <option value="Cours">Cours</option>
                        <option value="TD">TD</option>
                      </Form.Control>
                    </Form.Group>
                    {seance && seance.type === 'TD' && (
                      <Form.Group className="mb-3" controlId="groupe">
                        <Form.Label>Groupe</Form.Label>
                        {seance && seance.type === 'TD' ? (
                          <Form.Control
                            as="select"
                            name="groupe"
                            value={seance.groupe}
                            onChange={(e) => {
                              console.log('The chosen group' + e.target.value);
                              setSeance({ ...seance, groupe: e.target.value }); // Update the groupe state
                            }}
                          >
                            <option value="">Sélectionnez un groupe</option>
                            {groupes.map((groupe) => (
                              <option key={groupe.id} value={groupe.id}>
                                {groupe.name}
                              </option>
                            ))}
                          </Form.Control>
                        ) : (
                          <Form.Control as="select" disabled>
                            <option value="">Sélectionnez un groupe</option>
                          </Form.Control>
                        )}
                      </Form.Group>
                    )}
                    {/* Timeslots */}
                    <Form.Group className="mb-3" controlId="timeSlot">
                      <Form.Label>Time Slots</Form.Label>
                      <Form.Control
                        as="select"
                        name="timeSlot"
                        value={realCellIndex}
                        onChange={(e) => setSeance({ ...seance, timeSlot: e.target.value })}
                      >
                        {timeSlots.map((timeSlot) => {
                          const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

                          return (
                            <option key={timeSlot.id} value={timeSlot.id}>
                              {jours[timeSlot.day_of_week - 1]} {timeSlot.starTime.slice(0, -3)} - {timeSlot.endTime.slice(0, -3)}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={6}></Col>
              </Row>
              <Button onClick={handleCreateSeance} variant="contained">
                Créer
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
