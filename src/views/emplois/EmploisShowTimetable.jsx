import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon
import './emploiStyle.css';

const EmploiList = () => {
  const [seances, setSeances] = useState([]);
  const { id, sectionId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
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
  // Function to handle seance box click
  const handleSeanceClick = (seanceId, professorEmail) => {
    // Check if the current user's email matches the professor's email of the seance
    if (user.roles.some((role) => role.name === 'ROLE_ADMIN') || user.email === professorEmail) {
      console.log('Seance ID:', seanceId);
      navigate('/seances/edit/' + seanceId);
    } else {
      // Display an error message or handle the situation accordingly
      console.log('You are not authorized to edit this seance.');
    }
  };

  // Function to handle adding a new seance
  const handleAddSeance = (cellIndex) => {
    console.log('Add new seance at:', cellIndex);
    // Redirect to the page to add a new seance at the selected time slot
    navigate(`/seances/create/${id}/${sectionId}/${cellIndex}`);
  };

  const renderCellContent = (dayIndex, slotIndex) => {
    const timeSlots = ['08:30:00', '10:30:00', '13:30:00', '15:30:00'];

    const matchingSeances = seances.filter((seance) => {
      if (seance && seance.timeSlot) {
        return seance.timeSlot.day_of_week === dayIndex && seance.timeSlot.starTime === timeSlots[slotIndex];
      }
      return false;
    });

    if (matchingSeances.length > 0) {
      return (
        <div style={{ marginTop: '5px', position: 'relative' }}>
          {matchingSeances.map((seance, index) => (
            <React.Fragment key={seance.id}>
              {index > 0 && <hr style={{ margin: '5px 0', borderTop: '1px solid #ccc' }} />}
              <Button
                onClick={() => handleSeanceClick(seance.id, seance.professor.email)}
                style={{
                  background:
                    seance.type === 'Cours' ? 'green' : seance.type === 'TD' ? 'blue' : seance.type === 'TP' ? 'lightcoral' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  display: 'block',
                  textAlign: 'left',
                  padding: '5px',
                  width: '100%',
                  textTransform: 'none'
                }}
                className="seance-button"
              >
                <p style={{ margin: '0' }}>
                  {seance.element && seance.element.name} - {seance.type}
                </p>
                <p style={{ margin: '0' }}>{seance.salle && seance.salle.name}</p>
                <p style={{ margin: '0' }}>
                  {seance.professor
                    ? seance.professor.type === 'Vacataire'
                      ? 'Professeur: ' + seance.vacataire_alias
                      : `Professeur: ${seance.professor.firstName} ${seance.professor.lastName}`
                    : ''}
                </p>
                {seance.groupe && (seance.type === 'TD' || seance.type === 'TP') && (
                  <p key={seance.groupe.id} style={{ margin: '0' }}>
                    {seance.groupe.name}
                  </p>
                )}
              </Button>
            </React.Fragment>
          ))}
        </div>
      );
    } else {
      return (
        <Button
          style={{
            background: 'transparent',
            border: 'none',
            display: 'block',
            padding: '0',
            width: '100%',
            textTransform: 'none',
            color: '#000',
            textAlign: 'left'
          }}
          className="seance-button"
        >
          <p style={{ margin: '0' }}>-</p>

          {user.roles.some((role) => role.name !== 'ROLE_ETUDIANT') ? (
            <>
              {console.log('User roles:', user.roles)}
              <Button
                onClick={() => handleAddSeance(dayIndex * 4 + slotIndex)}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: 'transparent',
                  border: 'none',
                  padding: '5px'
                }}
              >
                <FaPlus /> {/* Plus icon */}
              </Button>
            </>
          ) : (
            console.log("Won't show")
          )}
        </Button>
      );
    }
  };

  // Function to render the timetable table
  const renderTimetable = () => {
    const timeSlots = ['08:30 - 10:20', '10:30 - 12:20', '13:30 - 15:20', '15:30 - 17:20'];
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
                <td key={`${day}-${slot}`} style={{ position: 'relative' }}>
                  {/* Render the timetable content */}
                  {renderCellContent(dayIndex + 1, slotIndex)}

                  {/* Button to add a new seance */}
                  {user.roles.some((role) => role.name !== 'ROLE_ETUDIANT') && (
                    <Button
                      onClick={() => handleAddSeance(dayIndex * 4 + slotIndex)}
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        padding: '3px 6px', // Adjust padding to make it smaller
                        fontSize: '12px', // Adjust font size to make it smaller
                        borderRadius: '4px' // Add border radius for rounded corners
                      }}
                    >
                      +{/* Use a small plus sign as the button content */}
                    </Button>
                  )}
                </td>
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
              <Card.Title as="h5">Emploi du temps</Card.Title>
            </Card.Header>
            <Card.Body>{renderTimetable()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EmploiList;
