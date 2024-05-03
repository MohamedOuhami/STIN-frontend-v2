import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function CreateElement() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [professors, setProfessors] = useState([]);
  const [modules, setModules] = useState([]);
  const [nbr_seances_per_week_Cours, setNbr_seances_per_week_Cours] = useState('');
  const [nbr_seances_per_week_TD, setNbr_seances_per_week_TD] = useState('');
  const [nbr_hours_Cours, setNbr_hours_Cours] = useState('');
  const [nbr_hours_TD, setNbr_hours_TD] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataProfessors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/professors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfessors(response.data);
        console.log('Les professeurs ont été récupérés', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des professeurs :', error);
      }
    };

    const fetchDataModules = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/modules', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setModules(response.data);
        console.log('Les modules ont été récupérés', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des modules :', error);
      }
    };

    fetchDataProfessors();
    fetchDataModules();
  }, []);

  const handleCreateElement = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/elements',
        { name, description, professor: {id:selectedProfessor}, module: {id:selectedModule}, nbr_seances_per_week_Cours, nbr_seances_per_week_TD, nbr_hours_Cours, nbr_hours_TD },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('Le module a été créé', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Erreur lors de la création du module :', error);
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
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Nom de l&apos;élément</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Entrer le nom de l'élément"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                      <Form.Label>Description de l&apos;élément</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Entrer la description de l'élément"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="professor">
                      <Form.Label>Professeur</Form.Label>
                      <Form.Control
                        as="select"
                        value={selectedProfessor}
                        onChange={(e) => setSelectedProfessor(e.target.value)}
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
                      <Form.Label>Module</Form.Label>
                      <Form.Control
                        as="select"
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                      >
                        <option value="">Sélectionnez un module</option>
                        {modules.map((module) => (
                          <option key={module.id} value={module.id}>
                            {module.name} - {module.filiereSemestre.filiere.name}/S{module.filiereSemestre.semestre.count}
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
                      value={nbr_seances_per_week_Cours}
                      onChange={(e) => setNbr_seances_per_week_Cours(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="nbr_seances_per_week_TD">
                    <Form.Label>Nombre de séances de TD par semaine</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Entrer le nombre de séances"
                      value={nbr_seances_per_week_TD}
                      onChange={(e) => setNbr_seances_per_week_TD(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="nbr_hours_Cours">
                    <Form.Label>Nombre total d&apos;heures de Cours par semaine</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Entrer le nombre d'heures"
                      value={nbr_hours_Cours}
                      onChange={(e) => setNbr_hours_Cours(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="nbr_hours_TD">
                    <Form.Label>Nombre total d&apos;heures de TD par semaine</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Entrer le nombre d'heures"
                      value={nbr_hours_TD}
                      onChange={(e) => setNbr_hours_TD(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button onClick={handleCreateElement} variant="contained">
                Créer
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
