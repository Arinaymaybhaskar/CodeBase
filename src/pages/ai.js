// MainComponent.js
import React, { useState } from "react";
import axios from "axios";

const AI = () => {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");
  const [processing, setProcessing] = useState(false);
  const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;

  const fetchData = async () => {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: `Complete this sentence: "${input}"`,
        model: "gpt-3.5-turbo-instruct",
        max_tokens: 1000,
        n: 1,
        stop: ".",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].text;
  };

  async function handleClick() {
    try {
      setProcessing(true); // Start processing
      const completedSentence = await fetchData(input);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(false); // Stop processing
    }
  }

  return (
    <div className="container">
      <h2>Tell me something, and I'll tell you more</h2>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={5}
        placeholder="Type in some words and I'll finish the rest..."
      />
      <button className="button" onClick={handleClick} disabled={processing}>
        Complete Sentence
      </button>
      {processing && <p>Processing...</p>}
      {completedSentence && <pre>Completed sentence: {completedSentence}</pre>}
    </div>
  );
};

export default AI;
