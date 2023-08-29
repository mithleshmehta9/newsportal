import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./news.css"; // Import the CSS file



const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4600/news")
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(
            "Error while retrieving news data. Status: " + response.status
          );
        }
      })
      .then((data) => {
        const dataList = data.result;
        if (Array.isArray(dataList)) {
          setNewsData(dataList);
        } else {
          throw new Error("Invalid data format received.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error: " + error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {newsData.map((article) => (
        <Card key={article.newsid} className="news-article">
          <Card.Img
            src={`http://localhost:4600/images/${article.files}`}
            alt={article.title}
            className="article-image"
          />
          <Card.Body className="article-details">
            <Card.Title>{article.title}</Card.Title>
            <Card.Text className="content">{article.content}</Card.Text>
            <div className="metadata">
              <p>
                <strong>Publish Date:</strong> {article.publish_date}
              </p>
              <p>
                <strong>Source:</strong> {article.source}
              </p>
              <p>
                <strong>Category:</strong> {article.category}
              </p>
              <p>
                <strong>Status:</strong> {article.status}
              </p>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default News;
