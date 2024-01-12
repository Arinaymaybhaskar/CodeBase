import React, { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import MonacoEditor from "react-monaco-editor";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  Eraser,
  Copy,
  WrapText,
  AArrowDown,
  AArrowUp,
  X,
  Focus,
} from "lucide-react";

const CodeEditor = ({ label, code, onChange, onClear, onCopy }) => {
  const [wordWrap, setWordWrap] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleWordWrap = () => {
    setWordWrap(!wordWrap);
  };

  const increaseFontSize = () => {
    setFontSize(fontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 1);
  };

  return (
    <div className="w-full border shadow-md border-gray-200 rounded-xl p-2 pb-0 h-full  mt-[14px] lg:mt-0 md:mt-0">
      <div className="flex w-full justify-between lg:px-5 md:px-5 mb-1 items-center">
        <label
          className="lg:text-2xl md:text-2xl underline underline-offset-[3px] mr-7"
          style={{ textDecorationThickness: "1px" }}
        >
          {label}
        </label>

        <div
          className="flex gap-2 border px-2 my-1 rounded-lg  lg:max-w-xs md:max-w-xs overflow-scroll"
          id="options"
        >
          <button onClick={increaseFontSize} title="Increase Font Size">
            <AArrowUp size={27} color="rgb(0, 0, 0)" strokeWidth={1} />
          </button>
          <button onClick={decreaseFontSize} title="Decrease Font Size">
            <AArrowDown size={27} color="rgb(0, 0, 0)" strokeWidth={1} />
          </button>
          <button onClick={() => onCopy(code)} title="Copy" strokeWidth={1}>
            <Copy size={20} color="rgb(0, 0, 0)" />
          </button>
          <button onClick={toggleWordWrap} title="Toggle Word Wrap">
            <WrapText size={20} color="rgb(0, 0, 0)" />
          </button>
          <button onClick={onClear} title="Clear" strokeWidth={1}>
            <Eraser size={20} color="rgb(239, 68, 68)" />
          </button>
        </div>
      </div>
      <MonacoEditor
        height="25vh"
        width={`100%`}
        language={label.toLowerCase()}
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: true },
          fontSize: fontSize,
          wordWrap: wordWrap ? "on" : "off",
        }}
      />
    </div>
  );
};

const SvgEditor = () => {
  const [svgCode, setSvgCode] = useState("");
  const [fileName, setFileName] = useState("Image.svg");
  // const [zoomLevel, setZoomLevel] = useState(0.5); // Initial zoom level

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSvgCode(e.target.result);
    };

    reader.readAsText(file);
  };

  const handleClear = () => {
    setSvgCode("");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
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

  // const handleZoomIn = () => {
  //   setZoomLevel((prevZoom) => prevZoom + 0.5);
  // };

  // const handleZoomOut = () => {
  //   setZoomLevel((prevZoom) => Math.max(0.5, prevZoom - 0.5));
  // };

  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
    >
      {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
        <>
          <div className="flex w-full lg:flex-row md:flex-row flex-col lg:h-[80vh] md:h-[80vh] gap-3">
            <div className="flex flex-col border-r-2 px-4 w-full lg:w-1/2 md:w-1/2">
              <div className="w-full h-1/2 mb-10">
                <CodeEditor
                  width="100%"
                  height="100%"
                  label="SVG"
                  code={svgCode}
                  onChange={setSvgCode}
                  onClear={handleClear}
                  onCopy={handleCopy}
                />
              </div>
              <div className=" flex flex-col">
                <div className="flex">
                  <input
                    type="file"
                    accept=".svg"
                    onChange={handleFileUpload}
                    className="mb-4 font-medium"
                  />
                  <label className="font-medium">
                    File Name:{" "}
                    <input
                      type="text"
                      value={fileName}
                      onChange={handleFileNameChange}
                      className="mb-4 p-2 border border-gray-300 rounded"
                    />
                  </label>
                </div>
                <button
                  onClick={handleDownload}
                  className="bg-purple-700 font-medium px-2 text-white py-2 rounded mt-4"
                >
                  Download SVG
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 md:w-1/2 h-full items-center ">
              <div className="w-full justify-end flex px-10 py-2 border-b-2 gap-1">
                <button
                  onClick={() => zoomIn()}
                  title="Zoom In"
                  className=" p-[5px] rounded-lg hover:bg-purple-200"
                >
                  <ZoomIn />
                </button>
                <button
                  onClick={() => zoomOut()}
                  title="Zoom Out"
                  className=" p-[5px] rounded-lg hover:bg-purple-200"
                >
                  <ZoomOut />
                </button>
                <button
                  onClick={() => resetTransform()}
                  title="Reset"
                  className=" p-[5px] rounded-lg hover:bg-purple-200"
                >
                  <X />
                </button>
                <button
                  onClick={() => centerView()}
                  title="Go to center"
                  className=" p-[5px] rounded-lg hover:bg-purple-200"
                >
                  <Focus />
                </button>
              </div>

              <TransformComponent>
                <div className="w-full h-full flex justify-center items-center">
                  <div
                    dangerouslySetInnerHTML={{ __html: svgCode }}
                    className="w-full h-full"
                  />
                </div>
              </TransformComponent>
            </div>
          </div>
        </>
      )}
    </TransformWrapper>
  );
};

export default SvgEditor;
