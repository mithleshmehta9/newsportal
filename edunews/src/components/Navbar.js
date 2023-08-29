// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'; // Include NavDropdown
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function NavBar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData');
    window.location.reload();
  };

  const userEmail = localStorage.getItem('userEmail');

  

  return (
    <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <div className="logo">
          <img src="http://localhost:4600/images/1690656406285-news-logo.png" alt="Logo" />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav-links">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/news">
            News
          </Nav.Link>
          <Nav.Link as={Link} to="/edunews">
            EduNotice
          </Nav.Link>
          <Nav.Link as={Link} to="/posts">
            Posts
          </Nav.Link>
          {/* Example usage of NavDropdown */}
        </Nav>
        {userEmail ? (
          <NavDropdown title={userEmail} id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/userprofile">
            Your Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/createpost">
            Create Post
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/history">
            History
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
        ) : (
          <div className="sign-btn">
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
            <button className="signup-button" onClick={handleSignupClick}>
              Sign Up
            </button>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
    
    </>
  );
}

export default NavBar;
