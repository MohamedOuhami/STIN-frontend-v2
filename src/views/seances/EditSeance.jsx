import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import Button from '@mui/material/Button';

export default function AssignProfessor() {
  const { id } = useParams(); // Access the id parameter from the URL
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  const [affectedProfessor, setAffectedProfessor] = useState(null);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`http://localhost:8080/seances/affect/${id}`, affectedProfessor, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' // Set content type to application/json
        }
      });

      // Handle response
      console.log('Professor assigned successfully:', response.data);
      navigate(-1);


      // Optionally, you can navigate to another page or perform other actions upon successful update
    } catch (error) {
      console.error('Error updating element:', error);
      navigate(-1);

    }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch the list of professors
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
                        // value={element ? element.professor.id : ''}
                        onChange={(e) => {
                          setAffectedProfessor({ id: e.target.value });
                          console.log('The sent professor ', affectedProfessor);
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
