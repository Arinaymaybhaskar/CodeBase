import React, { useState } from "react";

const SvgEditor = () => {
  const [svgCode, setSvgCode] = useState("");
  const [fileName, setFileName] = useState("image.svg"); // Initialize with a default file name

  const handleChange = (event) => {
    const code = event.target.value;
    setSvgCode(code);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSvgCode(e.target.result);
    };

    reader.readAsText(file);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([svgCode], { type: "image/svg+xml" });
    element.href = URL.createObjectURL(file);
    element.download = fileName; // Use the user-defined file name
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex w-full w-100vh h-[100vh]">
      <div className="flex flex-col bg-gray-200 p-4">
        <h2 className="text-2xl font-bold mb-4">SVG Editor</h2>
        <input
          type="file"
          accept=".svg"
          onChange={handleFileUpload}
          className="mb-4"
        />
        <textarea
          value={svgCode}
          onChange={handleChange}
          placeholder="Enter SVG code here..."
          cols="30"
          rows="10"
          className="bg-white p-2 border border-gray-300 rounded mb-4 w-[300px] h-[200px]"
        />
        <label>
          File Name:
          <input
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
        </label>

        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Download SVG
        </button>
      </div>
      <div className="w-full h-full ">
        <h2 className="text-2xl font-bold mb-4">SVG Preview</h2>
        <div className="flex flex-col w-full justify-center items-center bg-gray-100 p-4">
          <div dangerouslySetInnerHTML={{ __html: svgCode }} />
        </div>
      </div>
    </div>
  );
};

export default SvgEditor;
