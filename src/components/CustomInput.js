import React, { useState } from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  const [lines, setLines] = useState(['']);

  const handleChange = (e) => {
    const text = e.target.value;
    const linesArray = text.split('\n');
    setLines(linesArray);
  };
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md   bg-white mt-2"
        )}
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            #F9FAFB,
            #F9FAFB 1.5em,
            #F3F4F6 1.5em,
            #F3F4F6 3em
          )`
        }}
      ></textarea>
    </>
  );
};

export default CustomInput;
