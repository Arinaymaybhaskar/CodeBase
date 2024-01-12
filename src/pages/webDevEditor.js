import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { Eraser, Copy, WrapText, AArrowDown, AArrowUp } from "lucide-react";
import "./Styles.css";

const CodeEditor = ({ label, code, onChange, onClear, onCopy }) => {
  const [wordWrap, setWordWrap] = useState(false);
  const [fontSize, setFontSize] = useState(16); // Default font size

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
    <div className="mb-4 w-full border shadow-md border-gray-200 rounded-xl p-2 h-full  mt-[14px] lg:mt-0 md:mt-0">
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

const WebDevEditor = () => {
  const htmlcodeKey = "htmlcode";
  const csscodeKey = "csscode";
  const jscodeKey = "jscode";

  const [htmlCode, setHtmlCode] = useState(
    localStorage.getItem(htmlcodeKey) || ""
  );
  const [cssCode, setCssCode] = useState(
    localStorage.getItem(csscodeKey) || ""
  );
  const [jsCode, setJsCode] = useState(localStorage.getItem(jscodeKey) || "");

  useEffect(() => {
    localStorage.setItem(htmlcodeKey, htmlCode);
  }, [htmlCode, htmlcodeKey]);

  useEffect(() => {
    localStorage.setItem(csscodeKey, cssCode);
  }, [cssCode, csscodeKey]);

  useEffect(() => {
    localStorage.setItem(jscodeKey, jsCode);
  }, [jsCode, jscodeKey]);

  useEffect(() => {
    const output = document.getElementById("output");
    output.contentDocument.body.innerHTML =
      htmlCode + "<style>" + cssCode + "</style>";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.text = jsCode;
    output.contentDocument.body.appendChild(script);
  }, [htmlCode, cssCode, jsCode]);

  const handleHtmlClear = () => {
    setHtmlCode("");
  };

  const handleCSSClear = () => {
    setCssCode("");
  };

  const handleJSClear = () => {
    setJsCode("");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="px-4 w-full flex flex-col h-full gap-2">
      <div className="w-full flex gap-2 overflow-scroll" id="editors">
        <CodeEditor
          width="100%"
          label="HTML"
          code={htmlCode}
          onChange={setHtmlCode}
          onClear={handleHtmlClear}
          onCopy={handleCopy}
        />
        <CodeEditor
          label="CSS"
          width="100%"
          code={cssCode}
          onChange={setCssCode}
          onClear={handleCSSClear}
          onCopy={handleCopy}
        />
        <CodeEditor
          width="100%"
          label="JavaScript"
          code={jsCode}
          onChange={setJsCode}
          onClear={handleJSClear}
          onCopy={handleCopy}
        />
      </div>
      <iframe
        id="output"
        title="Output"
        className=" h-[87vh] border rounded-lg"
      />
    </div>
  );
};

export default WebDevEditor;
