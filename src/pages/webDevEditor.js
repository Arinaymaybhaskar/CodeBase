import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";

const CodeEditor = ({ label, code, onChange, onClear, onCopy }) => {
  return (
    <div className="mb-4">
      <div className="flex w-full justify-between">
        <label className="block mb-2 text-xl font-bold">{label}</label>
        <div className="flex gap-5">
          <button
            onClick={onClear}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Clear
          </button>
          <button
            onClick={() => onCopy(code)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Copy
          </button>
        </div>
      </div>
      <MonacoEditor
        height="25vh"
        width={`100%`}
        language={label.toLowerCase()}
        value={code}
        onChange={onChange}
        options={{ minimap: { enabled: true }, fontSize: 16 }}
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
        <CodeEditor
          width = "100%"
          label="HTML"
          code={htmlCode}
          onChange={setHtmlCode}
          onClear={handleHtmlClear}
          onCopy={handleCopy}
        />
        <CodeEditor
          label="CSS"
          code={cssCode}
          onChange={setCssCode}
          onClear={handleCSSClear}
          onCopy={handleCopy}
        />
        <CodeEditor
          label="JavaScript"
          code={jsCode}
          onChange={setJsCode}
          onClear={handleJSClear}
          onCopy={handleCopy}
        />
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
