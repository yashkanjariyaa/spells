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
    <div>
      <h2>Spell & Grammar Check with Corrections</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
        cols="50"
        placeholder="Type your text here"
      />
      <br />
      <button onClick={handleSpellCheck} disabled={loading}>
        {loading ? "Checking..." : "Check"}
      </button>
      <div>
        <h3>Corrected Text:</h3>
        <textarea
          value={correctedText}
          readOnly
          rows="5"
          cols="50"
          placeholder="Corrected text will appear here"
        />
      </div>
    </div>
  );
};

export default SpellGrammarCheck;
