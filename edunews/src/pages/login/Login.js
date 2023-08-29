import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(true);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    // Check if the user is logged in based on the presence of userEmail
    setShowLoginModal(!userEmail);
  }, [userEmail]);

  const handleLogin = (event) => {
    event.preventDefault();

    const url = 'http://localhost:4600/login';
    const data = {
      email: email,
      password: password
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
        if (result.message === 'Success') {
          console.log(result.data);

          // Fetch user info after successful login
          fetchUserInfo(email);
        } else if (result.message === 'Invalid email or password') {
          console.log(result);
          alert('Invalid email or password');
        } else if (result.message === 'Password does not match') {
          console.log(result);
          alert('Password does not match');
        } else {
          console.log(result);
          alert('Unknown error occurred.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const fetchUserInfo = (email) => {
    const url = `http://localhost:4600/signup/email?email=${email}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('User Info:', data);
        // Do something with the user data
        // Example: Store it in state or local storage for further use
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userData", JSON.stringify(data));
        
        // Redirect to the homepage or any other desired page
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  if (userEmail) {
    return null;
  }

  return (
    <>

    <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
