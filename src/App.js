import "./App.css";
import Landing from "./pages/Landing";
import WebDevEditor from "./pages/webDevEditor";
import SvgEditor from "./pages/SvgEditor";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AI from "./pages/ai";

function App() {
  return (
    <div className="flex h-screen font-montserrat">
      <Navbar/>
      <div className="w-full flex-1 mt-28 overflow-hidden h-fit">
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/compiler" element = {<Landing/>}/>
        <Route path="/svg" element = {<SvgEditor/>}/>
        <Route path="/web" element = {<WebDevEditor/>}/>
        <Route path="/ai" element = {<AI/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;