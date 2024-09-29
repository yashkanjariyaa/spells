import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const containerStyle = {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
    maxWidth: "600px",
  };

  const headingStyle = {
    fontSize: "2em",
    margin: "10px 0",
    color: "#333",
  };

  const paragraphStyle = {
    fontSize: "1.1em",
    margin: "10px 0",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1em",
  };

  const buttonStyle = {
    padding: "10px 15px",
    fontSize: "1em",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to Your Language Assistant</h1>
      <p style={paragraphStyle}>
        Enhance your writing and communication with our powerful translation,
        spelling, and grammar check app.
      </p>
      <p style={paragraphStyle}>
        Whether you're drafting an email, writing a report, or communicating in
        a different language, our tool will help you ensure your text is clear,
        accurate, and free of errors.
      </p>
      <p style={paragraphStyle}>
        Get started by entering your text below and see how we can assist you!
      </p>
     

    </div>
  );
};

export default Home;
