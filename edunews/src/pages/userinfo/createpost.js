import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './createuserpost.css';

const UserPostForm = () => {
  const [files, setFiles] = useState([]);
  const [postUser_id, setPostUser_id] = useState();
  const [postContent, setPostContent] = useState('');
  const [postLikes, setPostLikes] = useState(0);
  const [postComments, setPostComments] = useState(0);
  const [postShares, setPostShares] = useState(0);

  useEffect(() => {
    // Retrieve the stored user_id from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      if (parsedData.output && parsedData.output.length > 0) {
        setPostUser_id(parsedData.output[0].id);
      }
    }

    // Set initial values for likes, comments, and shares
    setPostLikes(1);
    setPostComments(1);
    setPostShares(1);
  }, []);

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    let url, data, image;

    url = 'http://localhost:4600/post';
    data = {
      user_id: postUser_id,
      content: postContent,
      images: image,
      likes: postLikes,
      comments: postComments,
      shares: postShares,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      // Add other fields for Posts
    };
    try {
        var res = await axios.post(`http://localhost:4600/upload`, formData);
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
        alert('Creating Successful');
        window.location.reload();
      } catch (error) {
        console.log('Error:', error);
        alert(error.message);
      }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      let files = e.target.files;
      let x = [];
      for (let i = 0; i < files.length; i++) {
        x.push(files[i]);
      }
      setFiles(x);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleCreateSubmit}>
        {/* <div>
          <label htmlFor="postuid">PostId</label>
          <input
            type="number"
            id="postuid"
            value={postUser_id}
            onChange={(e) => handleInputChange(e, setPostUser_id)}
            required
          />
        </div> */}
        <div>
          <label htmlFor="content">Content</label>
          <input
            type="text"
            id="content"
            value={postContent}
            onChange={(e) => handleInputChange(e, setPostContent)}
            required
          />
        </div>
        <div>
          <label htmlFor="files">Choose Image</label>
          <input
            type="file"
            id="files"
            onChange={handleFileChange}
            required
            accept="image/png, image/jpg, image/jpeg"
            multiple
          />
        </div>
        {/* <div>
          <label htmlFor="likes">Likes</label>
          <input
            type="number"
            id="likes"
            value={postLikes}
            onChange={(e) => handleInputChange(e, setPostLikes)}
            required
          />
        </div>
        <div>
          <label htmlFor="comments">Comments</label>
          <input
            type="number"
            id="comments"
            value={postComments}
            onChange={(e) => handleInputChange(e, setPostComments)}
            required
          />
        </div>
        <div>
          <label htmlFor="shares">Shares</label>
          <input
            type="number"
            id="shares"
            value={postShares}
            onChange={(e) => handleInputChange(e, setPostShares)}
            required
          />
        </div> */}
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default UserPostForm;
