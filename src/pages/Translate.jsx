import { useState } from "react";

function Translate() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("en");
  const [translateResult, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translate = async () => {
    setLoading(true);
    setError("");
    setResult("");

    const params = new URLSearchParams({
      text: text,
      lang: lang,
    });

    try {
      const res = await fetch(
        `https://spells-server.onrender.com/translate/?${params.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error("Translation failed");
      }

      const result = await res.json();
      setResult(result.translatedText || "No translation available");
    } catch (err) {
      setError(err.message);
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
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Text Translator</h1>

      <textarea
        style={{
          width: "100%",
          height: "120px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          resize: "none",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
        value={text}
        placeholder="Enter text here..."
        onChange={(e) => setText(e.target.value)}
      />

      <select
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          cursor: "pointer",
          backgroundColor: "#fff",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="hi">Hindi</option>
      </select>

      <button
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
        onClick={translate}
        disabled={loading} // Disable button while loading
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#0056b3";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#007BFF";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      <div style={{ marginTop: "20px", textAlign: "left", width: "100%" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {translateResult && (
          <div>
            <h3 style={{ color: "#333" }}>Translation:</h3>
            <p
              style={{
                padding: "10px",
                backgroundColor: "#e9ecef",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              {translateResult}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Translate;
