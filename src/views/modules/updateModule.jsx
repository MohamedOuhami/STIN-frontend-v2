import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function UpdatePrepaStudent() {
  const [module, setModule] = useState({});
  const [loading, setLoading] = useState(true);
  const [filiereSemestres, setFiliereSemestres] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiliereSemestres = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/filiere_semestre', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFiliereSemestres(response.data); // Mise à jour de l'état avec les données récupérées
        console.log('Les filiere semestres ont été récupérés', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des semestres :', error);
      }
    };

    const fetchModule = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/modules/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setModule(response.data);
        setLoading(false); // Update loading state after fetching data
        console.log('Salle mise à jour', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de la salle :', error);
      }
    };

    fetchModule();
    fetchFiliereSemestres();
  }, [id]); // Include id as dependency

  const handleUpdateModule = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8080/modules/${id}`, module, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Mise à jour du module :', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du module :', error);
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
                    value={module.name}
                    onChange={(e) => setModule({ ...module, name: e.target.value })}
                    type="text"
                    placeholder="Entrer le nom"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={module.description}
                    onChange={(e) => setModule({ ...module, description: e.target.value })}
                    type="text"
                    placeholder="Entrer le CIN"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Sélectionner le semestre</Form.Label>
                  <Form.Control onChange={(e) => setModule({ ...module, filiereSemestre: JSON.parse(e.target.value) })} as="select">
                    {filiereSemestres &&
                      filiereSemestres.map((filiereSemestre) => {
                        return (
                          <option key={filiereSemestre.id} value={JSON.stringify(filiereSemestre)}>
                            Semestre {filiereSemestre.semestre.count} - filiere {filiereSemestre.filiere.name}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>

                <Button variant="contained" onClick={handleUpdateModule}>
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
