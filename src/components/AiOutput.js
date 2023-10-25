import React, { useState, useEffect } from "react";
import { sendRequest } from "./openAI";

function AiOutput({ outputDetails }) {
  const [Result, setResult] = useState("");
  const [response, setResponse] = useState(null);
  const [codeOutput, setCodeOutput] = useState("");
  const code = atob(outputDetails.source_code);
  const Memory = outputDetails?.memory; // kilobyte
  const StatusDescription = outputDetails?.status?.description;
  const StatusCode = outputDetails?.status?.id;
  const Time = outputDetails?.time; // seconds
  const CompileOutput = atob(outputDetails?.compile_output);
  const StdOut = atob(outputDetails?.stdout);
  const StdErr = atob(outputDetails.stderr);
  const language = outputDetails.language.name;

  const getOutput = () => {
    let output = "";
    switch (StatusCode) {
      case 3:
        output = StdOut;
        break;
      case 6:
        output = CompileOutput;
        break;
      case 5:
      case 7:
      case 8:
      case 9:
      case 10:
        output = StatusDescription;
        break;
      default:
        output = StdErr;
        break;
    }
    setCodeOutput(output);
  };

  useEffect(() => {
    getOutput();
  }, [outputDetails]);

  const request = `My ${language} code is ${code} and the output is ${codeOutput} the memory used is: ${Memory}, the time spent is ${Time} seconds what went wrong?`;

  const handleClick = async () => {
    console.log("handleClick called");
    console.log(request);
    
    console.log(process.env.REACT_APP_OPEN_AI_API_KEY);
    // const res = await sendRequest(codeOutput);
    // console.log(res);
    // try {
    //   setResult(sendRequest(codeOutput));
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };


  return (
    <div>
      <p>{response}</p>
      {Result ? (
        <>
          <h1>Result</h1>
          <p>{response}</p>
        </>
      ) : (
        <div>
          <button onClick={handleClick}>ASK</button>
        </div>
      )}
    </div>
  );
}

export default AiOutput;
