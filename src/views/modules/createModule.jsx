import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function CreatePrepaStudent() {
  const [name, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [filiereSemestres, setFiliereSemestres] = useState('');
  const [filiereSemestre, setFiliereSemestre] = useState('');

  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const handleCreateModule = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/modules',
        { name, description, filiereSemestre },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('Le module a été créé', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Erreur lors de la création du module :', error);
    }

    console.log('Création du module : ', { name, description, filiereSemestre });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Créer un module</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control onChange={(e) => setNom(e.target.value)} type="text" placeholder="Entrer le nom" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Entrer le CIN" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sélectionner le semestre</Form.Label>
                <Form.Control
                  onChange={(e) => setFiliereSemestre(JSON.parse(e.target.value))} // Mise à jour de l'état du semestre au changement
                  as="select"
                >
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

              <Button variant="contained" onClick={handleCreateModule}>
                Créer
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
