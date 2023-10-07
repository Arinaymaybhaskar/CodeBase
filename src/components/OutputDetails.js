import React, { useState } from "react";
import Popup from "./Popup";
import AiOutput from "./AiOutput";

const OutputDetails = ({ outputDetails }) => {
  const [buttonPopup, SetButtonPopup] = useState(false);
  return (
    <>
      <div className="metrics-container mt-4 flex flex-col space-y-3">
        <p className="text-sm">
          Status:{" "}
          <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
            {outputDetails?.status?.description}
          </span>
        </p>
        <p className="text-sm">
          Memory:{" "}
          <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
            {outputDetails?.memory} Kb
          </span>
        </p>
        <p className="text-sm">
          Time:{" "}
          <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
            {Math.ceil((outputDetails?.time)*100)} milliseconds
          </span>
        </p>
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => {
            SetButtonPopup(true);
          }}
        >
          Ask AI
        </button>
        <Popup trigger={buttonPopup} setTrigger={SetButtonPopup}>
          <AiOutput outputDetails={outputDetails}/>
        </Popup>
      </div>
    </>
  );
};

export default OutputDetails;
