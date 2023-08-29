import React, { useState, useEffect } from 'react';
import Form  from 'react-bootstrap';
//import axios from "axios";
import "./createpost.css";

const UserPostForm = () => {
//   const [content, setContent] = useState("");
//   const [files, setFiles] = useState("");
//   const [likes, setLikes] = useState(0);
//   const [comments, setComments] = useState(0);
//   const [shares, setShares] = useState(0);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const x = new FormData();
//   for(let i = 0; i < File.length; i++){
//     x.append('files', files[i]);
//   }
//   console.log('reached here',x) 
//     const user_id = localStorage.getItem("user_id");
//     const created_at = new Date().toISOString();
//     const updated_at = created_at;

//     const newPost = {
//       user_id,
//       content,
//       likes,
//       comments,
//       shares,
//       created_at,
//       updated_at,
//     };

//     axios
//   .put(`http://localhost:4600/post`, newPost, {
//     headers: { "Content-Type": "multipart/form-data" },
//     data: x,
//   })
//  // Modify the API endpoint URL as needed
//       .then((response) => {
//         console.log("Post created:", response.data);
//         // Perform any actions after successful post creation, if needed
//         // For example, update the list of posts on the page.
//       })
//       .catch((error) => {
//         console.error("Error creating post:", error);
//         // Handle errors, display error messages, etc.
//       });

//     // Reset the form fields after submission
//     setContent("");
//     setFiles("");
//     setLikes(0);
//     setComments(0);
//     setShares(0);
//   };
//   const handleFileChange = (e) => {
//     //setter(e.target.value);
//     if(e.target.files.length > 0){
//       let files = e.target.files;
//       let x = [];
//       for(let i = 0; i < files.length; i++){
//         x.push(files[i]);
//       }
//       setFiles(x);
//     }
//   }

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
const [showCreatePopup, setShowCreatePopup] = useState();
// Function to handle the click on the "Create" button for each section


// Function to handle form submission for creating News, EduNews, and Posts (using one function for all three)
const handleCreateSubmit = async (event) => {
  event.preventDefault();

  const x = new FormData();
  for(let i = 0; i < File.length; i++){
    x.append('files', files[i]);
  }
  console.log('reached here',x) 
  let url, data, image;
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


  return (
    <div>
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
    </div>
  );
};

export default UserPostForm;
