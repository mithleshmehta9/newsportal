import React, { useState, useEffect } from "react";
import "./post.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Post = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4600/post")
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(
            "Error while retrieving Api news data. Status: " + response.status
          );
        }
      })
      .then((data) => {
        const postDataList = data.result;
        if (Array.isArray(postDataList)) {
          setPostData(postDataList);
        } else {
          throw new Error("Invalid data format received.");
        }
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  return (
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
  );
};

export default Post;
