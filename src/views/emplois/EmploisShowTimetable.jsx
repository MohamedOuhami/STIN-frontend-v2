import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './emploiStyle.css';

const EmploiList = () => {
  const [seances, setSeances] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/seances/timeTable/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSeances(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching Seances:', error);
      }
    };
    fetchData();
  }, [id]);

  // Function to handle seance box click
  const handleSeanceClick = (seanceId) => {
    console.log('Seance ID:', seanceId);
    navigate('/seances/edit/' + seanceId);
  };

  // Function to render the content of each timetable cell
  // Function to render the content of each timetable cell
const renderCellContent = (dayIndex, slotIndex) => {
  // Find all seances for the given day and time slot
  const timeSlots = ['08:30:00', '10:30:00', '13:30:00', '15:30:00'];

  const matchingSeances = seances.filter(
    (seance) =>
      seance.timeSlot.day_of_week === dayIndex && seance.timeSlot.starTime === timeSlots[slotIndex]
  );

  // If there are matching seances, render them
  if (matchingSeances.length > 0) {
    return (
      <div style={{ marginTop: '5px' }}>
        {matchingSeances.map((seance, index) => (
          <React.Fragment key={seance.id}>
            {index > 0 && <hr style={{ margin: '5px 0', borderTop: '1px solid #ccc' }} />} {/* Add line separator */}
            <Button
              onClick={() => handleSeanceClick(seance.id)}
              style={{
                background: 'transparent',
                color: '#000',
                border: 'none',
                display: 'block', // Display buttons as block elements to stack them vertically
                textAlign: 'left', // Align text to the left
                padding: '0',
                width: '100%', // Set button width to 100%
                textTransform: 'none' // Prevent text transformation
              }}
              className="seance-button"
            >
              <p style={{ margin: '0' }}>
                {seance.element && seance.element.name} - {seance.type}
              </p>
              <p style={{ margin: '0' }}>{seance.salle && seance.salle.name}</p>
              <p style={{ margin: '0' }}>
                {seance.professor
                  ? `Professor: ${seance.professor.firstName} ${seance.professor.lastName}`
                  : ''}
              </p>
              {seance.groupe &&
                seance.type === 'TD' &&
                  <p key={seance.groupe.id} style={{ margin: '0' }}>
                    {seance.groupe.name}
                  </p>
                }
            </Button>
          </React.Fragment>
        ))}
      </div>
    );
  } else {
    // If no seance is found, render an empty cell
    return null;
  }
};


  // Function to render the timetable table
  const renderTimetable = () => {
    // Define time slots from 8:30 to 17:30
    const timeSlots = ['08:30 - 12:20', '10:30 - 12:20', '13:30 - 15:20', '15:30 - 17:20'];

    // Define days of the week
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Day</th>
            {timeSlots.map((slot) => (
              <th key={slot}>{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, dayIndex) => (
            <tr key={day}>
              <td>{day}</td>
              {timeSlots.map((slot, slotIndex) => (
                <td key={`${day}-${slot}`}>{renderCellContent(dayIndex + 1, slotIndex)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Liste des emplois</Card.Title>
            </Card.Header>
            <Card.Body>{renderTimetable()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EmploiList;
