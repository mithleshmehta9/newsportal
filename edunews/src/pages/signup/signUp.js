import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(true);
  const [formErrors, setFormErrors] = useState({
    name: "",
    password: "",
    contact: "",
    email: "",
    username: "",
    address: "",
  });
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    // Check if the user is logged in based on the presence of userEmail
    setShowSignupModal(!userEmail);
  }, [userEmail]);

  const handleInputChange = (event, setter) => {
    const { name, value } = event.target;
    setter(value);
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "This field is required." : /^[a-zA-Z ]+$/.test(value) ? "" : "Invalid name. Only letters and spaces are allowed.";
      case "password":
        return value.trim() === "" ? "This field is required." : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? "" : "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
      case "contact":
        return value.trim() === "" ? "This field is required." : /^\d+$/.test(value) ? "" : "Invalid contact. Only digits are allowed.";
      case "email":
        return value.trim() === "" ? "This field is required." : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email address.";
      case "username":
        return value.trim() === "" ? "This field is required." : /^[a-zA-Z0-9_]+$/.test(value) ? "" : "Invalid username. Only alphanumeric characters and underscores are allowed.";
      case "address":
        return value.trim() === "" ? "This field is required." : "";
      default:
        return "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for empty fields before submitting
    const errors = {};
    Object.keys(formErrors).forEach((key) => {
      if (formErrors[key].trim() !== "") {
        errors[key] = formErrors[key];
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const url = 'http://localhost:4600/signup';
    const data = {
      name,
      password,
      contact,
      email,
      username,
      address
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Save Successfull') {
          console.log(result);
          localStorage.setItem('userEmail', email);
          navigate('/');
        } else if (result.message === 'Email already exists.') {
          console.log(result);
          alert('Email already exists. Please use a different email.');
        } else {
          console.log(result);
          alert('Unknown error occurred.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Signup failed. Please try again.');
      });
  };
  
  if (userEmail) {
    return null;
  }

  return (
    <>
      <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(event) => handleInputChange(event, setName)}
                required
              />
              <Form.Text className="text-danger">{formErrors.name}</Form.Text>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(event) => handleInputChange(event, setPassword)}
                required
              />
              <Form.Text className="text-danger">{formErrors.password}</Form.Text>
            </Form.Group>

            <Form.Group controlId="formContact">
              <Form.Label>Contact:</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={contact}
                onChange={(event) => handleInputChange(event, setContact)}
                required
              />
              <Form.Text className="text-danger">{formErrors.contact}</Form.Text>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(event) => handleInputChange(event, setEmail)}
                required
              />
              <Form.Text className="text-danger">{formErrors.email}</Form.Text>
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={(event) => handleInputChange(event, setUsername)}
                required
              />
              <Form.Text className="text-danger">{formErrors.username}</Form.Text>
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={address}
                onChange={(event) => handleInputChange(event, setAddress)}
                required
              />
              <Form.Text className="text-danger">{formErrors.address}</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUp;
