import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function AssignProfessor() {
  const { id } = useParams();
  const [professors, setProfessors] = useState([]);
  const [seance, setSeance] = useState(null);
  const [salles, setSalles] = useState([]);
  const [elements, setElements] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [showAlias, setShowAlias] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch the seance data
        const seanceResponse = await axios.get(`http://localhost:8080/seances/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSeance(seanceResponse.data);

        // Fetch the groupes data only if seanceResponse.data is not null
        if (seanceResponse.data) {
          const groupesResponse = await axios.get('http://localhost:8080/groupes/section/' + seanceResponse.data.timeTable.section.id, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setGroupes(groupesResponse.data);
        }

        const professorsResponse = await axios.get('http://localhost:8080/professors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfessors(professorsResponse.data);

        const elementsResponse = await axios.get('http://localhost:8080/elements', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setElements(elementsResponse.data);

        const timeSlotsResponse = await axios.get('http://localhost:8080/timeslots', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTimeSlots(timeSlotsResponse.data);

        const sallesResponse = await axios.get('http://localhost:8080/salles', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSalles(sallesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log(seance);
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');

      // Extracting IDs from the seance object
      const seanceToUpdate = {
        professor: { id: seance.professor.id },
        salle: { id: seance.salle.id },
        element: { id: seance.element.id },
        type: seance.type,
        timeTable: { id: seance.timeTable.id },
        timeSlot: { id: seance.timeSlot.id },
        groupe: seance.groupe ? { id: seance.groupe.id } : null,
        vacataire_alias: seance.vacataire_alias
      };

      console.log(seanceToUpdate);

      const response = await axios.put(
        `http://localhost:8080/seances/${id}`,
        seanceToUpdate, // Sending only the IDs
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Seance updated successfully:', response.data);
      console.log(seanceToUpdate);
      navigate(-1);
    } catch (error) {
      console.error('Error updating seance:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(
        `http://localhost:8080/seances/${id}`, // Sending only the IDs
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Seance delete successfully:', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Error updating seance:', error);
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
                      <Form.Label>Professeur</Form.Label>
                      <Form.Control
                        as="select"
                        name="professor"
                        value={seance ? seance.professor.id : ''}
                        onChange={(e) => {
                          setSeance({ ...seance, professor: {id:e.target.value} });

                          const selectedProfessor = professors.find((prof) => prof.id == e.target.value);
                          console.log(selectedProfessor);
                          setShowAlias(selectedProfessor && selectedProfessor.type === 'Vacataire');
                        }}
                      >
                        <option value="">Sélectionnez un professeur</option>
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
                    <Form.Group className="mb-3" controlId="salle">
                      <Form.Label>Salle</Form.Label>
                      <Form.Control
                        as="select"
                        name="salle"
                        value={seance ? seance.salle.id : ''}
                        onChange={(e) => setSeance({ ...seance, salle: { id: e.target.value } })}
                      >
                        <option value="">Sélectionnez un salle</option>
                        {salles.map((salle) => (
                          <option key={salle.id} value={salle.id}>
                            {salle.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="element">
                      <Form.Label>Element</Form.Label>
                      <Form.Control
                        as="select"
                        name="element"
                        value={seance ? seance.element.id : ''}
                        onChange={(e) => setSeance({ ...seance, element: { id: e.target.value } })}
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
                        value={seance ? seance.type : ''}
                        onChange={(e) => {
                          setSeance({ ...seance, type: e.target.value });
                          // If type is Cours, clear the groupes selection
                          if (e.target.value === 'Cours') {
                            setSeance({ ...seance, groupe: null });
                          }
                        }}
                      >
                        <option value="">Sélectionnez un type</option>
                        <option value="Cours">Cours</option>
                        <option value="TD">TD</option>
                      </Form.Control>
                    </Form.Group>
                    {seance && seance.type === 'TD' && (
                      <Form.Group className="mb-3" controlId="salle">
                        <Form.Label>Groupe</Form.Label>
                        {seance && seance.type === 'TD' ? (
                          <Form.Control
                            as="select"
                            name="groupe"
                            value={seance ? (seance.groupe ? seance.groupe.id : '') : ''}
                            onChange={(e) => {
                              const selectedGroupId = e.target.value; // Get selected group ID
                              setSeance({ ...seance, groupe: { id: selectedGroupId } }); // Update the groupe state
                            }}
                          >
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
                    <Form.Group className="mb-3" controlId="salle">
                      <Form.Label>Horaire</Form.Label>

                      <Form.Control
                        as="select"
                        name="horaire"
                        value={seance ? (seance.timeSlot ? seance.timeSlot.id : '') : ''}
                        onChange={(e) => {
                          const selectedTimeSlotId = e.target.value; // Get selected group ID
                          setSeance({ ...seance, timeSlot: { id: selectedTimeSlotId } }); // Update the groupe state
                        }}
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
              <Button onClick={handleUpdate} variant="contained">
                Modifier
              </Button>
              <Button onClick={handleDelete} variant="contained">
                Supprimer
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
