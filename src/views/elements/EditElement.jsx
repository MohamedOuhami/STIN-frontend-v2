import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import Button from '@mui/material/Button';

export default function AssignProfessor() {
  const { id } = useParams(); // Access the id parameter from the URL
  const [professors, setProfessors] = useState([]);
  const [element, setElement] = useState(null);
  const [salles, setSalles] = useState([]);
  // const [affectedProfessor, setAffectedProfessor] = useState(null);
  // const [affectedSalle, setAffectedSalle] = useState(null);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');

      // Stringify the professor object
      // const professorJson = JSON.stringify(element.professor);

      // Send the updated element object to the server using axios.put
      const response = await axios.put(
        `http://localhost:8080/elements/${id}`,
        { ...element },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' // Set content type to application/json
          }
        }
      );

      // Handle response
      console.log('Element updated successfully:', response.data);

      // Optionally, you can navigate to another page or perform other actions upon successful update
    } catch (error) {
      console.error('Error updating element:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch the element details
        const elementResponse = await axios.get(`http://localhost:8080/elements/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setElement(elementResponse.data);

        // Fetch the list of professors
        const professorsResponse = await axios.get('http://localhost:8080/professors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfessors(professorsResponse.data);

        // Fetch the list of salles
        const sallesResponse = await axios.get('http://localhost:8080/salles', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSalles(sallesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  // Handle change in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement({ ...element, [name]: value });
    console.log(element);
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
                    {/* The element name */}
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Nom de l&lsquo;élément</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Entrer le nom de l&lsquo;élément"
                        name="name"
                        value={element ? element.name : ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    {/* The element description */}
                    <Form.Group className="mb-3" controlId="description">
                      <Form.Label>Description de l&lsquo;élément</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        name="description"
                        value={element ? element.description : ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="professor">
                      <Form.Label>Professeur</Form.Label>
                      <Form.Control
                        as="select"
                        name="professor"
                        value={element ? element.professor.id : ''}
                        onChange={(e) => setElement({ ...element, professor: { id: e.target.value } })}
                      >
                        <option value="">Sélectionnez un professeur</option>
                        {professors.map((professor) => (
                          <option key={professor.id} value={professor.id}>
                            {professor.firstName} {professor.lastName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="module">
                      <Form.Label>Salle</Form.Label>
                      <Form.Control
                        as="select"
                        name="module"
                        value={element ? element.module.id : ''}
                        onChange={(e) => setElement({ ...element, module: { id: e.target.value } })}
                      >
                        <option value="">Sélectionnez un module</option>
                        {salles.map((module) => (
                          <option key={module.id} value={module.id}>
                            {module.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="nbr_seances_per_week_Cours">
                    <Form.Label>Nombre de séances de Cours par semaine</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Entrer le nombre de séances"
                      name="nbr_seances_per_week_Cours"
                      value={element ? element.nbr_seances_per_week_Cours : ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="nbr_seances_per_week_TD">
                    <Form.Label>Nombre de séances de TD par semaine</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Entrer le nombre de séances"
                      name="nbr_seances_per_week_TD"
                      value={element ? element.nbr_seances_per_week_TD : ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="nbr_hours_Cours">
                    <Form.Label>Nombre total d&lsquo;heures de Cours par semaine</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Entrer le nombre d'heures"
                      name="nbr_hours_Cours"
                      value={element ? element.nbr_hours_Cours : ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="nbr_hours_TD">
                    <Form.Label>Nombre total d&lsquo;heures de TD par semaine</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Entrer le nombre d'heures"
                      name="nbr_hours_TD"
                      value={element ? element.nbr_hours_TD : ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
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
