import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate

export default function AddWants() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [professor, setProfessor] = useState({});
  const { id } = useParams();
  const navigate = useNavigate(); // Define navigate function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const timeSlotsResponse = await axios.get('http://localhost:8080/timeslots', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTimeSlots(timeSlotsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchProfessor = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/professors/' + id, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfessor(response.data);
        console.log('Professor updated:', response.data);
      } catch (error) {
        console.error('Error fetching professor data:', error);
      }
    };

    fetchData();
    fetchProfessor();
  }, [id]);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedTimeSlots((prevSelectedTimeSlots) => [...prevSelectedTimeSlots, { id: value }]);
    } else {
      setSelectedTimeSlots((prevSelectedTimeSlots) => prevSelectedTimeSlots.filter((slot) => slot.id !== value));
    }
  };

  // Function to handle form submission
  const handleAddWants = async () => {
    // Update professor state with selectedTimeSlots
    setProfessor((prevProfessor) => ({ ...prevProfessor, wantedTimeSlots: selectedTimeSlots }));
    console.log('Selected time slots:', selectedTimeSlots);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8080/professors/' + id, professor, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Professor updated:', response.data);
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Error updating professor:', error);
    }
  };

  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form>
                {/* Timeslots */}
                <Form.Group className="mb-3" controlId="timeSlot">
                  <Form.Label>Time Slots</Form.Label>
                  <Row>
                    {timeSlots.map((timeSlot, index) => (
                      <React.Fragment key={timeSlot.id}>
                        <Col md={6}>
                          <Form.Check
                            type="checkbox"
                            id={`checkbox-${timeSlot.id}`}
                            label={`${jours[timeSlot.day_of_week - 1]} ${timeSlot.starTime.slice(0, -3)} - ${timeSlot.endTime.slice(
                              0,
                              -3
                            )}`}
                            value={timeSlot.id}
                            onChange={handleCheckboxChange}
                          />
                        </Col>
                        {/* Render a new row after every second checkbox */}
                        {(index + 1) % 2 === 0 && <div className="w-100"></div>}
                      </React.Fragment>
                    ))}
                  </Row>
                </Form.Group>
                <Button onClick={handleAddWants} variant="contained">
                  Choisir les voeux
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
