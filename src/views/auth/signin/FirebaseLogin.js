import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import * as Yup from 'yup';
// import { Formik } from 'formik';

const FirebaseLogin = ({ className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
        email,
        password
      });

      if (response.status === 200) {
        console.log("User authenticated successfully");
        let token = response.data.token;
        localStorage.setItem("token", token);
        navigate("*")
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setErrors(true);
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={handleLogin} className={className}>
        <div className="form-group mb-3">
          <input
            className="form-control"
            label="Email Address / Username"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          {/* {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>} */}
        </div>
        <div className="form-group mb-4">
          <input
            className="form-control"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>} */}
        </div>

        {errors && (
          <Col sm={12}>
            <Alert variant="danger">erreur authentification</Alert>
          </Col>
        )}

        <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
          <input type="checkbox" className="custom-control-input" id="customCheck1" />
          <label className="custom-control-label" htmlFor="customCheck1">
            Save credentials.
          </label>
        </div>

        <Row>
          <Col mt={2}>
            <Button className="btn-block" color="primary" size="large" type="submit" variant="primary">
              Signin
            </Button>
          </Col>
        </Row>
      </form>
      <Row>
        <Col sm={12}>
          <h5 className="my-3"> OR </h5>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Button variant="danger">
            <i className="fa fa-lock" /> Sign in with Google
          </Button>
        </Col>
      </Row>

      <hr />
    </React.Fragment>
  );
};

FirebaseLogin.propTypes = {
  className: PropTypes.string
};

export default FirebaseLogin;
