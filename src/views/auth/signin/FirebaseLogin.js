// import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Row, Col, Button, Alert, FormLabel } from 'react-bootstrap';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
// import { useUserData } from '../../../contexts/userDataContext';

// import * as Yup from 'yup';
// import { Formik } from 'formik';

const FirebaseLogin = ({ className }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { path } = useUserData();

  if (localStorage.getItem('user')) {
    login();
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/v1/auth/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        localStorage.setItem('token', token);
        const user = responseData.user;
        localStorage.setItem('user', JSON.stringify(user));

        console.log(token);
        console.log(responseData.user);
        login();
        navigate('*');
      } else {
        // Si la réponse n'est pas OK, lancez une erreur
        throw new Error("Erreur d'authentification");
      }
    } catch (error) {
      console.error("Erreur d'authentification", error);
      setErrors('email or password incorrect');
    }
  };

  if (isLoggedIn) {
    navigate('*');
  }

  return (
    <React.Fragment>

      <form onSubmit={handleLogin} className={className}>
        <div className="form-group mb-3">
          <FormLabel>Adresse email</FormLabel>
          <input
            className="form-control"
            label="Email Address / Username"
            name="email"
            placeholder="Entrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          {/* {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>} */}
        </div>
        <div className="form-group mb-4">
          <FormLabel>Mot de passe</FormLabel>
          <input
            className="form-control"
            label="Password"
            type="password"
            id="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>} */}
        </div>

        {errors && (
          <Col sm={12}>
            <Alert variant="danger">Erreur lors de l&apos;authentification</Alert>
          </Col>
        )}
        <Row>
          <Col mt={2}>
            <Button className="btn-block" color="primary" size="large" type="submit" variant="primary">
              S&apos;authentifier
            </Button>
          </Col>
        </Row>
      </form>

      <hr />
    </React.Fragment>
  );
};

FirebaseLogin.propTypes = {
  className: PropTypes.string
};

export default FirebaseLogin;
