import { useState } from "react";

function Translate() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("en");

  const translate = async () => {
    const params = new URLSearchParams({
      text: text,
      lang: lang,
    });

    const res = await fetch(
      `https://spells-server.onrender.com/translate/?${params.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = await res.json();
    console.log(result);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Text Translator</h1>

      <textarea
        style={{
          width: "300px",
          height: "100px",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
        value={text}
        placeholder="Enter text here..."
        onChange={(e) => setText(e.target.value)}
      />

      <select
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          width: "320px",
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
        }}
        onClick={translate}
      >
        Translate
      </button>
    </div>
  );
}

export default Translate;
