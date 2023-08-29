import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card"; // Assuming you are using Bootstrap for the Card component
import "./edunews.css";

const EducationNews = () => {
  const [eduData, setEduData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4600/edunews")
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
        const eduDataList = data.result;
        if (Array.isArray(eduDataList)) {
          setEduData(eduDataList);
        } else {
          throw new Error("Invalid data format received.");
        }
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  return (
    <div className="news-card-container">
      {eduData.map((edunews) => (
        <Card key={edunews.eduid} className="news-card">
          <Card.Img
            src={`http://localhost:4600/images/${edunews.files}`}
            alt={edunews.title}
            className="card-image"
          />
          <Card.Body className="card-details">
            <Card.Title className="card-title">{edunews.title}</Card.Title>
            <Card.Text className="card-content">{edunews.content}</Card.Text>
            <div className="card-metadata">
              <p>
                <strong>ID:</strong> {edunews.eduid}
              </p>
              <p>
                <strong>Publish Date:</strong> {edunews.publish_date}
              </p>
              <p>
                <strong>Source:</strong> {edunews.source}
              </p>
              <p>
                <strong>Category:</strong> {edunews.category}
              </p>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default EducationNews;
