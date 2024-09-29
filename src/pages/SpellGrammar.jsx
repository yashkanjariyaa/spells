import React, { useState } from "react";

const SpellGrammarCheck = () => {
  const [text, setText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSpellCheck = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: text,
          language: "en-US",
        }),
      });

      const result = await response.json();
      if (result.matches.length) {
        let updatedText = text;
        result.matches.forEach((match) => {
          // Assuming we only want to apply the first suggestion
          const bestReplacement = match.replacements[0]?.value;
          if (bestReplacement) {
            // Replace the incorrect text in the original string with the best replacement
            updatedText =
              updatedText.slice(0, match.offset) +
              bestReplacement +
              updatedText.slice(match.offset + match.length);
          }
        });
        setCorrectedText(updatedText);
      } else {
        setCorrectedText("No mistakes found!");
      }
    } catch (error) {
      console.error("Error:", error);
      setCorrectedText("Error checking text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        backgroundColor: "#f0f4f8",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "40px auto",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        Spell & Grammar Check with Corrections
      </h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
        cols="50"
        placeholder="Type your text here"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          resize: "none",
          fontSize: "16px",
        }}
      />
      <button
        onClick={handleSpellCheck}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s, transform 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#0056b3";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#007BFF";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {loading ? "Checking..." : "Check"}
      </button>
      <div style={{ marginTop: "20px", textAlign: "left", width: "100%" }}>
        <h3 style={{ color: "#333" }}>Corrected Text:</h3>
        <textarea
          value={correctedText}
          readOnly
          rows="5"
          cols="50"
          placeholder="Corrected text will appear here"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
            resize: "none",
            fontSize: "16px",
            backgroundColor: "#e9ecef",
          }}
        />
      </div>
    </div>
  );
};

export default SpellGrammarCheck;
