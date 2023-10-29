// openAIFunctions.js
import axios from "axios";

const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;

const fetchData = async (input) => {
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: input,
      model: "text-davinci-003",
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

export default fetchData;
