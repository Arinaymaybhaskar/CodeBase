import React, { useState } from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
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
