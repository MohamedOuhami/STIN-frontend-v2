import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function UpdatePrepaStudent() {
  const [semestres, setSemestres] = useState(null);
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true); // Ajouter l'état de chargement

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSemestres = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/semestres', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSemestres(response.data); // Mettre à jour l'état avec les données récupérées
        setLoading(false); // Mettre à jour l'état de chargement une fois que les données sont récupérées
        console.log('Semestres récupérés', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des semestres :', error);
      }
    };

    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/ingStudents/admin/' + id, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudent(response.data);
        console.log('Étudiant mis à jour', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'étudiant :', error);
      }
    };

    fetchSemestres();
    fetchStudent();
  }, []);

  const handleUpdatePrepaStudent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8080/ingStudents/admin/update/'+id, student, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Mise à jour de l\'étudiant', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'étudiant :', error);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Mettre à jour un étudiant de classe préparatoire</Card.Title>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div>Chargement en cours...</div>
        ) : (
          <Row>
            <Col md={6}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    value={student.firstName}
                    onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
                    type="text"
                    placeholder="Entrez le nom"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>CIN</Form.Label>
                  <Form.Control
                    value={student.cin}
                    onChange={(e) => setStudent({ ...student, cin: e.target.value })}
                    type="text"
                    placeholder="Entrez le CIN"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={student.email}
                    onChange={(e) => setStudent({ ...student, email: e.target.value })}
                    type="email"
                    placeholder="Entrez l'email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nom d&apos;utilisateur</Form.Label>
                  <Form.Control
                    value={student.username}
                    onChange={(e) => setStudent({ ...student, username: e.target.value })}
                    type="text"
                    placeholder="Entrez le nom d'utilisateur"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date de naissance</Form.Label>
                  <Form.Control
                    value={student.dateNaissance}
                    onChange={(e) => setStudent({ ...student, dateNaissance: e.target.value })}
                    type="date"
                    placeholder="Entrez la date de naissance"
                  />
                </Form.Group>
                <Button variant="contained" onClick={handleUpdatePrepaStudent}>
                  Mettre à jour
                </Button>
              </Form>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  value={student.lastName}
                  onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
                  type="text"
                  placeholder="Entrez le prénom"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CNE</Form.Label>
                <Form.Control
                  value={student.cne}
                  onChange={(e) => setStudent({ ...student, cne: e.target.value })}
                  type="text"
                  placeholder="Entrez le CNE"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  value={student.telephone}
                  onChange={(e) => setStudent({ ...student, telephone: e.target.value })}
                  type="text"
                  placeholder="Entrez le téléphone"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lieu de naissance</Form.Label>
                <Form.Control
                  value={student.lieuNaissance}
                  onChange={(e) => setStudent({ ...student, lieuNaissance: e.target.value })}
                  type="text"
                  placeholder="Entrez le lieu de naissance"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sélectionnez le semestre</Form.Label>
                <Form.Control
                  onChange={(e) => setStudent({ ...student, semestre: JSON.parse(e.target.value) })}
                  as="select"
                >
                  {semestres &&
                    semestres.map((semestre) => {
                      if (semestre.count <= 4) {
                        return (
                          <option key={semestre.id} value={JSON.stringify(semestre)}>
                            Semestre {semestre.count}
                          </option>
                        );
                      }
                      return null; // Ne pas afficher cette option
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}
