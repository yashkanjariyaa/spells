// app.js
import express from "express";
import { translate } from "@vitalets/google-translate-api";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// /translate endpoint
app.get("/translate", async (req, res) => {
  const { text, lang } = req.query;

  // Check if text and language parameters are provided
  if (!text || !lang) {
    return res
      .status(400)
      .json({ error: "Please provide text and language parameters" });
  }

  try {
    // Translate the text
    const result = await translate(text, { to: lang });
    res.json({ translatedText: result.text });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error during translation", details: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
