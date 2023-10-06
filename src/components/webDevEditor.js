import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";

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

  const handleClear = () => {
    setHtmlCode("");
    setCssCode("");
    setJsCode("");
  };
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
    <div className="p-4 w-full flex gap-2">
      <div className="w-1/2">
        <div className="mb-4" id="htmlbox">
          <div className="flex w-full justify-between">
            <label className="block mb-2">HTML</label>
            <div className="flex gap-5">
              <button onClick={handleHtmlClear}>Clear</button>
              <button onClick={()=>{handleCopy(htmlCode)}}>Copy</button>
            </div>
          </div>
          <MonacoEditor
            height="25vh"
            width={`100%`}
            language="html"
            value={htmlCode}
            onChange={setHtmlCode}
            options={{ minimap: { enabled: true }, fontSize: 16 }}
          />
        </div>

        <div className="mb-4" id="cssbox">
          <div className="flex w-full justify-between">
            <label className="block mb-2">CSS</label>
            <div className="flex gap-5">
              <button onClick={handleCSSClear}>Clear</button>
              <button onClick={()=>{handleCopy(cssCode)}}>Copy</button>
            </div>
          </div>
          <MonacoEditor
            height="25vh"
            width={`100%`}
            language="css"
            value={cssCode}
            onChange={setCssCode}
            options={{ minimap: { enabled: true }, fontSize: 16 }}
          />
        </div>

        <div className="mb-4" id="jsbox">
          <div className="flex w-full justify-between">
            <label className="block mb-2">JavaScript</label>
            <div className="flex gap-5">
              <button onClick={handleJSClear}>Clear</button>
              <button onClick={()=>{handleCopy(jsCode)}}>Copy</button>
            </div>
          </div>
          <MonacoEditor
            height="25vh"
            width={`100%`}
            language="javascript"
            value={jsCode}
            onChange={setJsCode}
            options={{ minimap: { enabled: true }, fontSize: 16 }}
          />
        </div>
      </div>
      <button
        onClick={handleClear}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Clear All
      </button>

      <iframe id="output" title="Output" className="w-1/2 h-80vh border" />
    </div>
  );
};

export default WebDevEditor;
