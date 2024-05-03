import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress'; // Import LinearProgress
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmploisOptimize = () => {
  const [salles, setSalles] = useState([]);
  const [selectedSalles, setSelectedSalles] = useState([]);
  const [loading, setLoading] = useState(false); // New state for loading status
  const { id } = useParams();
  const [progress, setProgress] = useState(0); // State for progress bar
  const navigate = useNavigate();
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
    setLoading(true); // Set loading to true when optimization starts

    // Calculate the total number of iterations (2 minutes * 60 seconds)
    const totalSeconds = 120;
    let currentSeconds = 0;

    // Start progress bar
    const timer = setInterval(() => {
      setProgress(() => {
        if (currentSeconds >= totalSeconds) {
          clearInterval(timer);
          setLoading(false); // Set loading to false when optimization completes (or fails)
          return 100;
        }

        currentSeconds++;
        const progress = (currentSeconds / totalSeconds) * 100;
        return progress;
      });
    }, 1000); // Update progress every second

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/timetables/solveTimeTable/' + id, selectedSalles, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      navigate(-1);
    } catch (error) {
      console.error('Error optimizing timetables:', error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => JSON.parse(option.value));
    setSelectedSalles(selectedOptions);
  };

  // Calculate remaining time in minutes and seconds
  const remainingMinutes = Math.floor((120 - (progress / 100) * 120) / 60);
  const remainingSeconds = Math.floor((120 - (progress / 100) * 120) % 60);

  return (
    <React.Fragment>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{ color: 'white', fontSize: '24px', textAlign: 'center' }}>
            En cours d&apos;optimisation...
            <div>
              Temps restant : {remainingMinutes} min {remainingSeconds} sec
            </div>{' '}
            {/* Display remaining time */}
            {/* Progress bar */}
            <LinearProgress style={{ marginTop: '16px' }} variant="determinate" value={progress} />
          </div>
        </div>
      )}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Optimiser l&apos;emploi du temps</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Control
                as="select"
                className="mb-3"
                style={{ height: '200px' }} // Adjust the height as needed
                onChange={handleSelectChange}
                multiple
              >
                {salles.map((salle) => (
                  <option key={salle.id} value={JSON.stringify(salle)}>
                    {salle.name}
                  </option>
                ))}
              </Form.Control>

              <Button onClick={handleOptimize} variant="contained" disabled={loading}>
                {loading ? 'En cours...' : 'Optimiser'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EmploisOptimize;
