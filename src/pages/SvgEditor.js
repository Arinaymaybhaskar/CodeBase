import React, { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

const SvgEditor = () => {
  const [svgCode, setSvgCode] = useState("");
  const [fileName, setFileName] = useState("image.svg");
  const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level

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
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.5);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(0.5, prevZoom - 0.5));
  };

  return (
    <div className="flex w-full lg:flex-row md:flex-row flex-col w-100vh h-[100vh] gap-3">
      <div className="flex flex-col border-r-2 p-4">
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
        <div className="flex mt-4 justify-end w-full z-20">
          <button onClick={handleZoomIn} className="mr-2 cursor-pointer">
            <ZoomIn />
          </button>
          <button onClick={handleZoomOut} className="cursor-pointer">
            <ZoomOut />
          </button>
        </div>
      </div>
      <div className="lg:w-full lg:h-full h-1/3 w-[100%] flex justify-center p-2 border items-center overflow-auto">
        <div className="w-full flex flex-col items-center bg-slate-400 border justify-center h-full overflow-auto transition-all">
          <div
            dangerouslySetInnerHTML={{ __html: svgCode }}
            className={`bg-slate-300 w-full h-full flex justify-center items-center transition-all`}
            style={{ transform: `scale(${zoomLevel})` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SvgEditor;
