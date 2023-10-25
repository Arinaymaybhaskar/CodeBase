import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SvgEditor = () => {
  const [svgCode, setSvgCode] = useState('');

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

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([svgCode], { type: 'image/svg+xml' });
    element.href = URL.createObjectURL(file);
    element.download = 'image.svg';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className='flex w-full w-100vh h-[100vh]'>
      <div className='flex flex-col'>
        <h2>SVG Editor</h2>
        <input type="file" accept=".svg" onChange={handleFileUpload} />
        <textarea
          value={svgCode}
          onChange={handleChange}
          placeholder="Enter SVG code here..."
          cols="30"
          rows="10"
        />
        <h2>SVG Code</h2>
        <SyntaxHighlighter language="xml" style={docco}>
          {svgCode}
        </SyntaxHighlighter>
        <button onClick={handleDownload}>Download SVG</button>
      </div>
      <div className='flex flex-col w-full justify-center items-center'>
        <h2>SVG Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: svgCode }} />
      </div>
    </div>
  );
};

export default SvgEditor;
