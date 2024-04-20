import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmploisOptimize = () => {
  const [salles, setSalles] = useState([]);
  const [selectedSalles, setSelectedSalles] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/salles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSalles(response.data);
    } catch (error) {
      console.error('Error fetching Salles:', error);
    }
  };

  const handleOptimize = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/timetables/solveTimeTable/'+id, selectedSalles, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error optimizing timetables:', error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => JSON.parse(option.value));
    setSelectedSalles(selectedOptions);
  };

  const handleTestSelectedSalles = () => {
    console.log('Selected Salles:', selectedSalles);
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Optimiser lemploi du temps</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Control as="select" className="mb-3" onChange={handleSelectChange} multiple>
                {salles.map((salle) => (
                  <option key={salle.id} value={JSON.stringify(salle)}>
                    {salle.name}
                  </option>
                ))}
              </Form.Control>

              <Button onClick={handleOptimize} variant="contained">
                Optimize
              </Button>

              <Button onClick={handleTestSelectedSalles} variant="contained">
                Test Selected Salles
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EmploisOptimize;
