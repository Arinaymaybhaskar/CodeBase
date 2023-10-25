import "./App.css";
import Landing from "./pages/Landing";
import WebDevEditor from "./pages/webDevEditor";
import SvgEditor from "./pages/SvgEditor";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar/>
      <div className="pt-16">
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/compiler" element = {<Landing/>}/>
        <Route path="/svg" element = {<SvgEditor/>}/>
        <Route path="/web" element = {<WebDevEditor/>}/>
      </Routes>
      </div>
    </>
  );
}

export default App;