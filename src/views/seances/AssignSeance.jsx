import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import Button from '@mui/material/Button';

export default function AssignProfessor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  const [seance, setSeance] = useState([]);
  const [alias, setAlias] = useState("");
  const [affectedProfessor, setAffectedProfessor] = useState(null);
  const [showAlias, setShowAlias] = useState(false); // State to control the visibility of the alias input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch the seance data
        const seanceResponse = await axios.get(`http://localhost:8080/seances/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSeance(seanceResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  })


  const handleUpdateAlias = async () => {
    try {
      const token = localStorage.getItem('token');

      // Extracting IDs from the seance object
      const seanceToUpdate = {
        professor: { id: seance.professor.id },
        salle: seance.salle ? { id: seance.salle.id } : null,
        element: { id: seance.element.id },
        type: seance.type,
        timeTable: { id: seance.timeTable.id },
        timeSlot: seance.timeSlot ? { id: seance.timeSlot.id } : null,
        groupe: seance.groupe ? { id: seance.groupe.id } : null,
        vacataire_alias:alias
      };

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
    } catch (error) {
      console.error('Error updating seance:', error);
    }
  };

  
  const handleUpdateProfessor = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`http://localhost:8080/seances/affect/${id}`, affectedProfessor, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Professor assigned successfully:', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Error updating element:', error);
      navigate(-1);
    }
  };

  const handleUpdate = () => {
    handleUpdateAlias()
    handleUpdateProfessor()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const professorsResponse = await axios.get('http://localhost:8080/professors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfessors(professorsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

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
                        onChange={(e) => {
                          setAffectedProfessor({ id: e.target.value });

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
                      {showAlias && (
                        <Form.Group className="mb-3">
                          <Form.Label>Nom du vacataire</Form.Label>
                          <Form.Control onChange={(e) => setAlias(e.target.value)} type="text" placeholder="Entrer le nom du vacataire" />
                        </Form.Group>
                      )}
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Button onClick={handleUpdate} variant="contained">
                Modifier
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
