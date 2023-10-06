import "./App.css";
import { useState } from "react";
import Landing from "./components/Landing";
import WebDevEditor from "./components/webDevEditor";
import SvgEditor from "./components/SvgEditor";
import Navbar from "./components/Navbar";
import Popup from "./components/Popup";

function App() {
  const optionKey = "selectedOption";
  const [option, setOption] = useState(localStorage.getItem(optionKey) || null);
  const [buttonPopup, SetButtonPopup] = useState(false);
  const handleOption = (option) => {
    setOption(option);
    localStorage.setItem(optionKey, option);
  };

  const handleBack = () => {
    setOption(null);
    localStorage.removeItem(optionKey);
  };

  return (
    <div className="">
      <Navbar option={option} onBack={handleBack} />
      <div className="flex flex-col items-center mt-16 w-full h-full">
        {option === null && (
          <>
            <h1 className="text-3xl font-bold mb-4">Select an Option</h1>
            <div className="gap-2 flex">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => handleOption("webdev")}
              >
                HTML CSS JS
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => handleOption("compiler")}
              >
                Compiler
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => handleOption("svg")}
              >
                SVG
              </button>
              <button onClick={()=>{SetButtonPopup(true)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Popup
              </button>
            </div>
            <Popup trigger = {buttonPopup} setTrigger={SetButtonPopup}> 
              <h1>Popup</h1>
            </Popup>
          </>
        )}
        {option === "webdev" && <WebDevEditor />}
        {option === "compiler" && <Landing />}
        {option === "svg" && <SvgEditor />}
      </div>
    </div>
  );
}

export default App;
