import React, { useState, useEffect } from "react";
import axios from "axios";

function AiOutput({ outputDetails }) {
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState(null);
  const [codeOutput, setCodeOutput] = useState("");
  const code = atob(outputDetails.source_code);

  useEffect(() => {
    const getOutput = () => {
      let output = "";
      switch (outputDetails.status.id) {
        case 3:
          output = outputDetails.stdout;
          break;
        case 6:
          output = outputDetails.compile_output;
          break;
        case 5:
        case 7:
        case 8:
        case 9:
        case 10:
          output = outputDetails.status.description;
          break;
        default:
          output = outputDetails.stderr;
          break;
      }
      setCodeOutput(output);
    };

    getOutput();
  }, [outputDetails]);

  const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;

  const fetchData = async (input) => {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: input,
        model: "gpt-3.5-turbo-instruct",
        max_tokens: 2000,
        n: 1,
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

  const request = `
  What is wrong with my code?
  \nThis is the language I am using: \n${outputDetails.language.name}
  \nThis is my code: \n\`\`\`${outputDetails.language.name}\n${code}\n\`\`\`
  \nThis is the output I am getting:\n${atob(codeOutput)}.
  \nTell the problem in a concise sentence but if there is an updated code give only the code snippet where the changes are required.
`;

  async function handleClick() {
    try {
      setProcessing(true); // Start processing
      const completedSentence = await fetchData(request);
      console.log(completedSentence);
      setResponse(completedSentence);
    } catch (error) {
      console.error(error);
      // Handle error here, e.g., set an error state and display a message
    } finally {
      setProcessing(false); // Stop processing
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      {processing && <p className="text-center">Processing...</p>}
      {response && (
        <>
          <h1 className="text-2xl font-bold mb-2">Result: </h1>
          <pre className="bg-gray-200 p-2 max-w-lg rounded">{response}</pre>
        </>
      )}
      {!response && (
        <div className="text-center">
          <button
            onClick={handleClick}
            disabled={processing}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ASK
          </button>
          <p>{request}</p>
        </div>
      )}
    </div>
  );
}

export default AiOutput;
