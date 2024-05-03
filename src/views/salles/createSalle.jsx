import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function CreatePrepaStudent() {
  const [name, setName] = useState('');
  const [type, setType] = useState('Cours'); // Set default value to 'Cours'
  const [max_capacity, setCapacity] = useState('');

  const navigate = useNavigate();

  const handleCreateSalle = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/salles',
        { name, type, max_capacity },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('La salle a été créée :', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Erreur lors de la création de la salle :', error);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Créer une salle</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Entrer le nom" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select onChange={(e) => setType(e.target.value)} defaultValue="Cours">
                  <option value="Cours">Cours</option>
                  <option value="TD">TD</option>
                  <option value="TP">TP</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Capacité</Form.Label>
                <Form.Control onChange={(e) => setCapacity(e.target.value)} type="number" placeholder="Entrer la capacité" />
              </Form.Group>
              <Button variant="contained" onClick={handleCreateSalle}>
                Créer
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
