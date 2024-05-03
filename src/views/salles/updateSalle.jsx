import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function UpdatePrepaStudent() {
  const [salle, setSalle] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalle = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/salles/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSalle(response.data);
        setLoading(false); // Update loading state after fetching data
        console.log('Salle mise à jour', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de la salle :', error);
      }
    };

    fetchSalle();
  }, [id]); // Include id as dependency

  const handleUpdateSalle = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8080/salles/${id}`, salle, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Mise à jour de la salle :', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la salle :', error);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Mettre à jour une salle</Card.Title>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div>Chargement en cours...</div>
        ) : (
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    value={salle.name}
                    onChange={(e) => setSalle({ ...salle, name: e.target.value })}
                    type="text"
                    placeholder="Entrer le nom"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select onChange={(e) => setSalle({ ...salle, type: e.target.value })} defaultValue={salle.type}>
                    <option value="Cours">Cours</option>
                    <option value="TD">TD</option>
                    <option value="TP">TP</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Capacité</Form.Label>
                  <Form.Control
                    value={salle.max_capacity}
                    onChange={(e) => setSalle({ ...salle, max_capacity: e.target.value })}
                    type="number"
                    placeholder="Entrer la capacité"
                  />
                </Form.Group>

                <Button variant="contained" onClick={handleUpdateSalle}>
                  Mettre à jour
                </Button>
              </Form>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}
