import React, { useState, useEffect } from 'react';
import { Nav, ListGroup, Dropdown, Button, Row, Col, Pagination, Modal, Form } from 'react-bootstrap';
import { updateNews, updateEdunews, updatePosts, deleteNews, deleteEdunews, deletePosts } from './api';
import './admin.css';
import axios from 'axios';
const Admin = () => {

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    images: "",
  });
  useEffect(() => {
    const storedAdminData = localStorage.getItem("adminData");
    if (storedAdminData) {
      const parsedData = JSON.parse(storedAdminData);
      if (parsedData.output && parsedData.output.length > 0) {
        setAdminData(parsedData.output[0]);
      }
    }
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (id) => {
    // Perform the PUT request to update the user on the server
    try {
      const response = await fetch(`http://localhost:4600/admin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id: adminData.id }), // Include the id from userData
      });
      const result = await response.json();
      localStorage.removeItem('adminEmail');
      localStorage.removeItem("adminData");
      console.log(result);
      
      alert('Updating Admin Successful');
      window.location.reload();
    } catch (error) {
      console.error('Error updating admin data:', error);
      throw error;
    }
  }
  const [show, setShow] = useState(false);
  const handleSignout = () => {
    localStorage.removeItem('adminEmail');
    localStorage.removeItem("adminData");
    window.location.reload();
    setShowModal(true);
  };
  const handleSignup = (event) => {
    event.preventDefault();
    const url = 'http://localhost:4600/admin';
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
          fetchAdminInfo(email);

          // Fetch user info after successful login
          // fetchUserInfo(email);
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
    // Perform the signup logic here, e.g., make a POST request to the backend
    const fetchAdminInfo = (email) => {
      const url = `http://localhost:4600/admin/email?email=${email}`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('Admin Info:', data);
          localStorage.setItem("adminEmail", email);
          localStorage.setItem("adminData", JSON.stringify(data));
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

  }
  const handleEdit = () => {
    setFormData({
      id: adminData.id,
      name: adminData.name,
      email: adminData.email,
      images: adminData.images,
    });
    setShow(true);
  };



  const [files, setFiles] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeSection, setActiveSection] = useState('News'); 

  const [posts, setPosts] = useState([]);
  const [edunews, setEdunews] = useState([]);
  const [news, setNews] = useState([]);
  const [postsloading, setpostsLoading] = useState(true);
  const [eduloading, seteduLoading] = useState(true);
  const [newsloading, setnewsLoading] = useState(true);

  const [activeSectionC, setActiveSectionC] = useState('CreateNews');
  
  // State variables and state update functions for creating News
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsNewsid, setNewsId] = useState('');
  const [newsPublish_date, setNewspublish_date] = useState('');
  const [newsSource, setNewsSource] = useState('');
  const [newsCategory, setNewsCategory] = useState('');
  // const [newsImage_url, setNewsImage_url] = useState('');
  const [newsStatus, setNewsStatus] = useState('');
  
  // State variables and state update functions for creating EduNews
  const [edunewsid, setEduNewsId] = useState('');
  const [edunewsTitle, setEduNewsTitle] = useState('');
  const [edunewsContent, setEduNewsContent] = useState('');
  const [edunewsPublish_date, setEduNewsPublish_date] = useState('');
  const [edunewsSource, setEduNewsSource] = useState('');
  const [edunewsCategory, setEduNewsCategory] = useState('');
  // const [edunewsimage_url, setEduNewsImage_url] = useState('');

  // State variables and state update functions for creating Posts
  const [postUser_id, setPostUser_id] = useState('');
  const [postContent, setPostContent] = useState('');
  // const [postImages, setPostImages] = useState('');
  const [postLikes, setPostLikes] = useState('');
  const [postComments, setPostComments] = useState('');
  const [postShares, setPostShares] = useState('');
  const [postCreated_at, setPostCreated_at] = useState('');
  const [postUpdated_at, setPostUpdated_at] = useState('');
  

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };
 // State variable to manage the visibility of the "Create" pop-up
const [showCreatePopup, setShowCreatePopup] = useState(false);
// Function to handle the click on the "Create" button for each section
const handleCreateClick = (section) => {
  if (section === 'News') {
    setActiveSectionC('CreateNews');
  } else if (section === 'EduNews') {
    setActiveSectionC('CreateEduNews');
  } else if (section === 'Posts') {
    setActiveSectionC('CreatePosts');
  }
  // Show the "Create" pop-up
  setShowCreatePopup(true);
};

// Function to handle form submission for creating News, EduNews, and Posts (using one function for all three)
const handleCreateSubmit = async (event) => {
  event.preventDefault();

  const x = new FormData();
  for(let i = 0; i < File.length; i++){
    x.append('files', files[i]);
  }
  console.log('reached here',x) 
  let url, data, image;
  if (activeSectionC === 'CreateNews') {
    url = 'http://localhost:4600/news';
    data = {
      newsid: newsNewsid,
      title: newsTitle,
      content: newsContent,
      publish_date: newsPublish_date, 
      source: newsSource, 
      category: newsCategory, 
      image_url: image,
      status: newsStatus
      
    };
  } else if (activeSectionC === 'CreateEduNews') {
    url = 'http://localhost:4600/edunews';
    data = {
      eduid: edunewsid,
      title: edunewsTitle,
      content: edunewsContent,
      publish_date: edunewsPublish_date,
      source: edunewsSource,
      category: edunewsCategory,
      image_url: image
      // Add other fields for EduNews
    };
  } else if (activeSectionC === 'CreatePosts') {
    url = 'http://localhost:4600/post';
    data = {
      user_id: postUser_id,
      content: postContent,
      images: image,
      likes: postLikes,
      comments: postComments,
      shares: postShares,
      created_at: postCreated_at,
      updated_at: postUpdated_at
      // Add other fields for Posts
    };
  }

  //var newData = {...data, files: image};
  try {
    var res = await axios.post(`http://localhost:4600/upload`,x);
    console.log(res,'res');
    alert(res);

    image = res.data.body.files;
    var newData = {...data, files: image};
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    const result = await response.json();
    console.log(result);
    setShowCreatePopup(false);
    alert('Creating Successful');
    window.location.reload();
  } catch (error) {
    console.log('Error:', error);
    alert(error.message);
  }
};

const handleFileChange = (e) => {
  //setter(e.target.value);
  if(e.target.files.length > 0){
    let files = e.target.files;
    let x = [];
    for(let i = 0; i < files.length; i++){
      x.push(files[i]);
    }
    setFiles(x);
  }
}


  

  // Handle click on the edit button
  const handleEditClick = (data) => {
    setEditData(data);
    setShowEditPopup(true);
  };

  // Handle click on the delete button
  const handleDeleteClick = async (data) => {
    try {
      if (activeSection === 'News') {
        await deleteNews(data.id);
      } else if (activeSection === 'EduNews') {
        await deleteEdunews(data.id);
      } else if (activeSection === 'Posts') {
        await deletePosts(data.id);
      }
      alert('Delete Successfully');
      window.location.reload();
    } catch (error) {
      alert('Error While Deleting')
    }
  };
  // Handle form submission for updating data
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    setShowEditPopup(false);
    try {
      if (activeSection === 'News') {
        await updateNews(editData.id, editData);
      } else if (activeSection === 'EduNews') {
        await updateEdunews(editData.id, editData);
      } else if (activeSection === 'Posts') {
        await updatePosts(editData.id, editData);
      }
      alert('Update Successfully');
      window.location.reload();
    } catch (error) {
      alert('Error While Updating');
    }
  };
  useEffect(() => {
    fetchPostsData();
    fetcheduData();
    fetchnewsData();
    checkLogin();
  }, []);

  //fetch userdata from Server
  const fetchPostsData = async () => {
    try {
      const response = await fetch('http://localhost:4600/post');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setPosts(data.result); // Use data.result to set the posts state
      setpostsLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setPosts([]);
      setpostsLoading(false);
    }
  };
  //fetch Edunewsdata from Server
  const fetcheduData = async () => {
    try {
      const response = await fetch('http://localhost:4600/edunews');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setEdunews(data.result); // Use data.result to set the posts state
      seteduLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setEdunews([]);
      seteduLoading(false);
    }
  };
  //fetch Newsdata from Server
  const fetchnewsData = async () => {
    try {
      const response = await fetch('http://localhost:4600/news');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setNews(data.result); // Use data.result to set the posts state
      setnewsLoading(false);
    } catch (error) {
      console.error('Error fetching news data:', error);
      setNews([]);
      setnewsLoading(false);
    }
  };

  const checkLogin = () =>{
    let adminData = JSON.parse(localStorage.getItem('adminData'));
    if(!adminData) setShowModal(true)
    else setShowModal(false);
  }


// Pagination
const postsPerPage = 6;
const totalPages = Math.ceil(posts.length / postsPerPage);
const [currentPage, setCurrentPage] = useState(1);
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
const startIndex = (currentPage - 1) * postsPerPage;
const endIndex = startIndex + postsPerPage;
const displayedPosts = posts.slice(startIndex, endIndex);
const displayedEdunews = edunews.slice(startIndex, endIndex); // Use edunews array here
const displayedNews = news.slice(startIndex, endIndex); 


  return (
    <>
    <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
      <Modal.Header>
        <Modal.Title>Admin Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="emailInput">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passwordInput">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSignup}>
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
    <main>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
          <span className="fs-4">Sidebar</span>
        </a>
        <hr />
        <Nav className="nav nav-pills flex-column mb-auto">
          <Nav.Item>
            <Nav.Link onClick={() => setActiveSection('News')} className="text-white">
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2" /></svg>
              News
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => setActiveSection('EduNews')} className="text-white">
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table" /></svg>
              EduNews
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => setActiveSection('Posts')} className="text-white">
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
              Posts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => setActiveSection('Create')} className="text-white">
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
              Create
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <hr />
        <Dropdown>
          <Dropdown.Toggle
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
          >
            <img src='http://localhost:4600/images/1690659377676-WhatsApp%20Image%202023-07-30%20at%201.19.08%20AM.png' alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>Mithlesh Mehta</strong>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <Dropdown.Item href="#" onClick={() => setActiveSection('AdminProfile')}>Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#" onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {activeSection === 'News' && (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '1200px' }}>
          <h1>News</h1>
          <ListGroup>
          <ListGroup.Item>
          <Row>
            <Col>
              <strong>Id</strong>
            </Col>
            <Col>
              <strong>Title</strong>
            </Col>
            <Col>
              <strong>Publish Date</strong>
            </Col>
            <Col>
              <strong>Action</strong>
            </Col>
          </Row>
          </ListGroup.Item>
          {newsloading ? (
              <p>Loading...</p>
            ) : !Array.isArray(news) ? (
              <p>Error: News data is not available.</p>
            ) : (
              displayedNews.map((news) => (
                <ListGroup.Item key={news.id}>
                  <Row>
                    <Col>{news.id}</Col>
                    <Col>{news.title}</Col>
                    <Col>{news.publish_date}</Col>
                    <Col>
                      <Button variant="info" onClick={() => handleEditClick(news)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteClick(news)}>Delete</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
          {/* Pagination */}
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}

      {activeSection === 'EduNews' && (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '1200px' }}>
          <h1>EduNews</h1>
          <ListGroup>
          <ListGroup.Item>
          <Row>
            <Col>
              <strong>Id</strong>
            </Col>
            <Col>
              <strong>Title</strong>
            </Col>
            <Col>
              <strong>Publish Date</strong>
            </Col>
            <Col>
              <strong>Source</strong>
            </Col>
            <Col>
              <strong>Category</strong>
            </Col>
            <Col>
              <strong>Actions</strong>
            </Col>
          </Row>
          </ListGroup.Item>
          {eduloading ? (
              <p>Loading...</p>
            ) : !Array.isArray(edunews) ? (
              <p>Error: News data is not available.</p>
            ) : (
              displayedEdunews.map((edunews) => (
                <ListGroup.Item key={edunews.id}>
                  <Row>
                    <Col>{edunews.id}</Col>
                    <Col>{edunews.title}</Col>
                    <Col>{edunews.publish_date}</Col>
                    <Col>{edunews.source}</Col>
                    <Col>{edunews.category}</Col>
                    <Col>
                      <Button variant="info" onClick={() => handleEditClick(edunews)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteClick(edunews)}>Delete</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
          {/* Pagination */}
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>

        </div>
      )}

      {activeSection === 'Posts' && (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '1200px' }}>
          <h1>Posts</h1>
          <ListGroup>
          <ListGroup.Item>
          <Row>
            <Col>
              <strong>Id</strong>
            </Col>
            <Col>
              <strong>Contect</strong>
            </Col>
            <Col>
              <strong>Likes</strong>
            </Col>
            <Col>
              <strong>Comments</strong>
            </Col>
            <Col>
              <strong>Shares</strong>
            </Col>
            <Col>
              <strong>Created_at</strong>
            </Col>
            <Col>
              <strong>Action</strong>
            </Col>
          </Row>
          </ListGroup.Item>
          {postsloading ? (
              <p>Loading...</p>
            ) : !Array.isArray(posts) ? (
              <p>Error: User data is not available.</p>
            ) : (
              displayedPosts.map((posts) => (
                <ListGroup.Item key={posts.id}>
                  <Row>
                    <Col>{posts.id}</Col>
                    <Col>{posts.content}</Col>
                    <Col>{posts.likes}</Col>
                    <Col>{posts.comments}</Col>
                    <Col>{posts.shares}</Col>
                    <Col>{posts.created_at}</Col>
                    <Col>
                      <Button variant="info" onClick={() => handleEditClick(posts)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteClick(posts)}>Delete</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
          {/* Pagination */}
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}



      {activeSection === 'Create' && (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '1200px' }}>
          <h1>Create</h1>
          <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>News</strong>
            </Col>
            <Col>
              <Button variant="info" onClick={() => handleCreateClick('News')}>Create News</Button>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>EduNews</strong>
            </Col>
            <Col>
              <Button variant="info" onClick={() => handleCreateClick('EduNews')}>Create EduNews</Button>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Post</strong>
            </Col>
            <Col>
              <Button variant="info" onClick={() => handleCreateClick('Posts')}>Create Post</Button>
            </Col>
          </Row>
        </ListGroup.Item>

          </ListGroup>
        </div>
      )}

      {activeSection === 'AdminProfile' && (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '1200px' }}>
          <h1>AdminProfile</h1>
          <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Admin Info</strong>
            </Col>
            <Col>
              <Button variant="info" onClick={handleEdit}>Edit</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Email:</strong>
            </Col>
            <Col>
              <strong>{adminData?.email}</strong>
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Name:</strong>
            </Col>
            <Col>
              <strong>{adminData?.name}</strong>
            </Col>
          </Row>
        </ListGroup.Item>
          </ListGroup>
        </div>
      )}

      {/* Popup Form */}
      <Modal show={showCreatePopup} onHide={() => setShowCreatePopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create {activeSectionC === 'CreateNews' ? 'News' : activeSectionC === 'CreateEduNews' ? 'EduNews' : 'Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateSubmit}>
            {/* Add input fields based on the data to be updated */}
            {activeSectionC === 'CreateNews' && (
              <>
                <Form.Group controlId="id">
                  <Form.Label>NewsId</Form.Label>
                  <Form.Control type="text" value={newsNewsid} onChange={event => handleInputChange(event, setNewsId)} required  />
                </Form.Group>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={newsTitle} onChange={event => handleInputChange(event, setNewsTitle)} required />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control type="text" value={newsContent} onChange={event => handleInputChange(event, setNewsContent)} required />
                </Form.Group>
                <Form.Group controlId="publish_date">
                  <Form.Label>Publish_date</Form.Label>
                  <Form.Control type="date" value={newsPublish_date} onChange={event => handleInputChange(event, setNewspublish_date)} required  />
                </Form.Group>
                <Form.Group controlId="source">
                  <Form.Label>Source</Form.Label>
                  <Form.Control type="text" value={newsSource} onChange={event => handleInputChange(event, setNewsSource)} required />
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" value={newsCategory} onChange={event => handleInputChange(event, setNewsCategory)} required />
                </Form.Group>
                {/* <Form.Group controlId="images"> */}
                {/* <Form.Label>Images</Form.Label>
                  <Form.Control type="file" value={newsImage_url} onChange={event => handleFileChange(event, setNewsImage_url)} required />
                </Form.Group> */}
                <label html= 'files' className='file' >
                <input className='text' type='file' id='files' name='files'onChange={handleFileChange} required accept='image/png, image/jpg, image/jprg'></input>
                </label>
    
    
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" value={newsStatus} onChange={event => handleInputChange(event, setNewsStatus)} required />
                </Form.Group>
                {/* Add other input fields for News */}
              </>
            )}
            {activeSectionC === 'CreateEduNews' && (
              <>
                <Form.Group controlId="eduid">
                  <Form.Label>EduId</Form.Label>
                  <Form.Control type="text" value={edunewsid} onChange={event => handleInputChange(event, setEduNewsId)} required  />
                </Form.Group>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={edunewsTitle} onChange={event => handleInputChange(event, setEduNewsTitle)} required />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control type="text" value={edunewsContent} onChange={event => handleInputChange(event, setEduNewsContent)} required />
                </Form.Group>
                <Form.Group controlId="publish_date">
                  <Form.Label>Publish_date</Form.Label>
                  <Form.Control type="date" value={edunewsPublish_date} onChange={event => handleInputChange(event, setEduNewsPublish_date)} required  />
                </Form.Group>
                <Form.Group controlId="source">
                  <Form.Label>Source</Form.Label>
                  <Form.Control type="text" value={edunewsSource} onChange={event => handleInputChange(event, setEduNewsSource)} required />
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" value={edunewsCategory} onChange={event => handleInputChange(event, setEduNewsCategory)} required />
                </Form.Group>
                {/* <Form.Group controlId="image_url">
                  <Form.Label>Image_url</Form.Label>
                  <Form.Control type="text" value={edunewsimage_url} onChange={event => handleInputChange(event, setEduNewsImage_url)} required />
                </Form.Group> */}
                <label html= 'files' className='file' >
                <input className='text' type='file' id='files' name='files'onChange={handleFileChange} required accept='image/png, image/jpg, image/jprg'></input>
                </label>
                
                {/* Add other input fields for EduNews */}
              </>
            )}

            {activeSectionC === 'CreatePosts' && (
              <>
                <Form.Group controlId="postuid">
                  <Form.Label>PostId</Form.Label>
                  <Form.Control type="number" value={postUser_id} onChange={event => handleInputChange(event, setPostUser_id)} required  />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control type="text" value={postContent} onChange={event => handleInputChange(event, setPostContent)} required />
                </Form.Group>
                {/* <Form.Group controlId="images">
                  <Form.Label>Images</Form.Label>
                  <Form.Control type="text" value={postImages} onChange={event => handleInputChange(event, setPostImages)} required />
                </Form.Group> */}
                <label html= 'files' className='file' >
                <input className='text' type='file' id='files' name='files'onChange={handleFileChange} required accept='image/png, image/jpg, image/jprg'></input>
                </label>
                <Form.Group controlId="likes">
                  <Form.Label>Likes</Form.Label>
                  <Form.Control type="number" value={postLikes} onChange={event => handleInputChange(event, setPostLikes)} required  />
                </Form.Group>
                <Form.Group controlId="comments">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control type="number" value={postComments} onChange={event => handleInputChange(event, setPostComments)} required />
                </Form.Group>
                <Form.Group controlId="share">
                  <Form.Label>Shares</Form.Label>
                  <Form.Control type="number" value={postShares} onChange={event => handleInputChange(event, setPostShares)} required />
                </Form.Group>
                <Form.Group controlId="created_at">
                  <Form.Label>Created_at</Form.Label>
                  <Form.Control type="date" value={postCreated_at} onChange={event => handleInputChange(event, setPostCreated_at)} required />
                </Form.Group>
                <Form.Group controlId="updated_at">
                  <Form.Label>Updated_at</Form.Label>
                  <Form.Control type="date" value={postUpdated_at} onChange={event => handleInputChange(event, setPostUpdated_at)} required />
                </Form.Group>
                {/* Add other input fields for Posts */}
              </>
            )}
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      
        


      {/* Popup form for editing data */}
      <Modal show={showEditPopup} onHide={() => setShowEditPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update {activeSection === 'News' ? 'News' : activeSection === 'EduNews' ? 'EduNews' : 'User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            {/* Add input fields based on the data to be updated */}
            {activeSection === 'News' && (
              <>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control type="text" value={editData.content} onChange={(e) => setEditData({ ...editData, content: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="image_url">
                  <Form.Label>Image_url</Form.Label>
                  <Form.Control type="file" value={editData.image_url} onChange={(e) => setEditData({ ...editData, image_url: e.target.value })} />
                </Form.Group>
                {/* Add other input fields for News */}
              </>
            )}
            {activeSection === 'EduNews' && (
              <>
                <Form.Group controlId="eduid">
                  <Form.Label>EduNews ID</Form.Label>
                  <Form.Control type="text" value={editData.eduid} onChange={(e) => setEditData({ ...editData, eduid: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="edutitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control type="text" value={editData.content} onChange={(e) => setEditData({ ...editData, content: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="image_url">
                  <Form.Label>Image_url</Form.Label>
                  <Form.Control type="text" value={editData.image_url} onChange={(e) => setEditData({ ...editData, image_url: e.target.value })} />
                </Form.Group>
                {/* Add other input fields for EduNews */}
              </>
            )}

            {activeSection === 'Posts' && (
              <>
                <Form.Group controlId="content">
                  <Form.Label>Contect</Form.Label>
                  <Form.Control type="text" value={editData.content} onChange={(e) => setEditData({ ...editData, content: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="images">
                  <Form.Label>Images</Form.Label>
                  <Form.Control type="text" value={editData.images} onChange={(e) => setEditData({ ...editData, images: e.target.value })} />
                </Form.Group>
                {/* Add other input fields for Posts */}
              </>
            )}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </main>

    <Modal show={show} onHide = {() => setShow(false)} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="user-form">
          <Form.Group>
            <Form.Label htmlFor="id">Id:</Form.Label>
            <Form.Control
              type="number"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* If you need to include an image input, you can use the following code: */}
          <Form.Group>
            <Form.Label htmlFor="images">Image:</Form.Label>
            <Form.Control
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="form-actions">
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default Admin;
