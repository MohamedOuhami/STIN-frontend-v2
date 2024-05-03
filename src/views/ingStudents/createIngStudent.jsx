import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function CreatePrepaStudent() {
  const [lastName, setNom] = useState('');
  const [firstName, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [cin, setCIN] = useState('');
  const [cne, setCNE] = useState('');
  const [telephone, setTelephone] = useState('');
  const [lieuNaissance, setLieuNaissance] = useState('');
  const [semestre, setSemestre] = useState(null);
  const [semestres, setSemestres] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/semestres', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSemestres(response.data); // Mise à jour de l'état avec les données récupérées
        console.log('Les semestres ont été récupérés', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des semestres :', error);
      }
    };
    fetchData();
  }, []);

  const handleCreatePrepaStudent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/ingStudents/admin/save',
        { lastName, firstName, email, username, dateNaissance, cin, cne, telephone, lieuNaissance, semestre,filiereSemestre:null,groupeProject:null,pfe:null },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('L\'étudiant de la classe préparatoire a été créé', response.data);
      navigate(-1)
    } catch (error) {
      console.error('Erreur lors de la création de l\'étudiant de la classe préparatoire :', error);
    }

    console.log('Création d\'un nouvel étudiant : ', { lastName, firstName, email, username, dateNaissance, cin, cne, telephone, lieuNaissance, semestre });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Créer un étudiant de la classe préparatoire</Card.Title>
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
                <Form.Label>CIN</Form.Label>
                <Form.Control onChange={(e) => setCIN(e.target.value)} type="text" placeholder="Entrer le CIN" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Entrer l'email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>nom d&apos;utilisateur</Form.Label>
                <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Entrer le nom d'utilisateur" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date de naissance</Form.Label>
                <Form.Control onChange={(e) => setDateNaissance(e.target.value)} type="date" placeholder="Entrer la date de naissance" />
              </Form.Group>
              
              <Button variant="contained" onClick={handleCreatePrepaStudent}>
                Créer
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control onChange={(e) => setPrenom(e.target.value)} type="text" placeholder="Entrer le prénom" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CNE</Form.Label>
              <Form.Control onChange={(e) => setCNE(e.target.value)} type="text" placeholder="Entrer le CNE" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control onChange={(e) => setTelephone(e.target.value)} type="text" placeholder="Entrer le téléphone" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lieu de naissance</Form.Label>
              <Form.Control onChange={(e) => setLieuNaissance(e.target.value)} type="text" placeholder="Entrer le lieu de naissance" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sélectionner le semestre</Form.Label>
              <Form.Control
                onChange={(e) => setSemestre(JSON.parse(e.target.value))} // Mise à jour de l'état du semestre au changement
                as="select"
              >
                {semestres &&
                  semestres.map((semestre) => {
                      return (
                        <option key={semestre.id} value={JSON.stringify(semestre)}>
                          Semestre {semestre.count}
                        </option>
                      );
                  })}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}