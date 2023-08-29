import React, { useState, useEffect } from "react";
import "./userProfile.css";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    contact: "",
    email: "",
    address: "",
    image: ""
  });

  const [show, setShow] = useState(false);

  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      if (parsedData.output && parsedData.output.length > 0) {
        setUserData(parsedData.output[0]);
      }
    }
  }, []);

  const [postData, setPostData] = useState([]);
  // ... (previous code)

  useEffect(() => {
    axios
      .get(`http://localhost:4600/post/user?user_id=${userData?.id}`)
      .then((response) => {
        console.log("Response data:", response.data);
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(
            "Error while retrieving Api news data. Status: " + response.status
          );
        }
      })
      .then((data) => {
        console.log("Data:", data);
        if (data && Array.isArray(data.output)) {
          setPostData(data.output); // Set the postData state directly with the array
        } else {
          throw new Error("Invalid data format received.");
        }
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, [userData?.id]);
  
  
  
  

// ... (rest of the code)


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Perform the PUT request to update the user on the server
    fetch(`http://localhost:4600/signup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, id: userData.id }), // Include the id from userData
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while updating user");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User data updated successfully:", data);
        alert('Update successfully. Please, Login again')
        localStorage.removeItem('userEmail');
        localStorage.removeItem("userData");
        window.location.href = '/';
         // After saving, return to non-edit mode
        setShow(false); // Close the modal after saving
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        // Optionally, you can display an error message to the user
      });
  };

  const handleEdit = () => {
    setFormData({
      id: userData.id,
      name: userData.name,
      contact: userData.contact,
      email: userData.email,
      address: userData.address,
      image: userData.image
    });
    setShow(true);
  };

  return (
    <div>
      <div className="user-profile">
        <div className="profile-photo">
          {/* Assuming you have a profile photo for the user */}
          <img src="http://localhost:4600/images/1690659377676-WhatsApp%20Image%202023-07-30%20at%201.19.08%20AM.png" alt="Profile" />
        </div>
        <div className="user-name">{userData?.name}</div>
        <div className="user-email">{userData?.email}</div>
        <div className="user-address">{userData?.address}</div>
          <Button variant="primary" onClick={handleEdit}>Edit Profile</Button>
          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Edit Profile
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="user-form">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Contact:</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file"
                    name="address"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div> */}
                <div className="form-actions">
                  <Button type="button" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
      </div>
      <div>
      {postData.map((post) => (
        <Card key={post.id} className="post-card">
          <Card.Header>
            <Row>
              <Col>
                <div className="user-info">Mithlesh Mehta</div>
              </Col>
              <Col className="create-date text-right">{post.created_at}</Col>
            </Row>
          </Card.Header>
          {post.content && <Card.Body className="post-content">{post.content}</Card.Body>}
          {post.files && (
            <Card.Body className="post-images">
              <Image src={`http://localhost:4600/images/${post.files}`} alt="Logo" fluid />
            </Card.Body>
          )}
          {post.content && (
            <Card.Body className="interactions">
              <Row className="w-100">
                <Col xs="4" className="d-flex justify-content-start">
                  <Button className="interaction-btn likes-btn">
                    <i className="fa fa-thumbs-up"></i> {post.likes} Likes
                  </Button>
                </Col>
                <Col xs="4" className="d-flex justify-content-center">
                  <Button className="interaction-btn comments-btn">
                    <i className="fa fa-comment"></i> {post.comments} Comments
                  </Button>
                </Col>
                <Col xs="4" className="d-flex justify-content-end">
                  <Button className="interaction-btn shares-btn">
                    <i className="fa fa-share"></i> {post.shares} Shares
                  </Button>
                </Col>
              </Row>
              {/* <Button className="edit-button">Edit</Button> */}
            </Card.Body>
          )}
        </Card>
      ))}
    </div>

      
    </div>
  );
}

export default UserProfile;
