import React from "react";
import "./footer.css"; // Import the CSS file for footer styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  // Replace with your social media links
  const socialLinks = [
    {
        icon: faFacebook,
        link: "https://www.facebook.com/mithlesh.mehta.127?mibextid=ZbWKwL",
      },
    {
      icon: faGithub,
      link: "https://github.com/mithleshmehta9",
    },
    {
        icon: faYoutube,
        link: "https://youtube.com/@racetrack4707",
      },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="developer-info">
          <h4>Developed By: Mithlesh Mehta</h4>
          <p>Web App Developer | UI/UX Enthusiast</p>
          <p>Email: mehtamithlesh9@gmail.com</p>
        </div>
        <div className="social-links">
          {socialLinks.map((linkItem, index) => (
            <a
              key={index}
              href={linkItem.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={linkItem.icon} size="lg" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
