import "./App.css";
import Landing from "./pages/Landing";
import WebDevEditor from "./pages/webDevEditor";
import SvgEditor from "./pages/SvgEditor";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AI from "./pages/ai";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { Tv2, Code2, Braces, Image } from "lucide-react";

function App() {
  return (
    <div className="flex  h-screen font-montserrat">
      <Navbar />
      <Sidebar>
        <SidebarItem
          icon={<Tv2 size={20} />}
          text="Home"
          link="/"
        ></SidebarItem>
        <SidebarItem
          icon={<Code2 size={20} />}
          text="Web"
          link="/web"
        ></SidebarItem>
        <SidebarItem
          icon={<Braces size={20} />}
          text="Compiler"
          link="/compiler"
        ></SidebarItem>
        <SidebarItem
          icon={<Image size={20} />}
          text="SVG"
          link="/svg"
        ></SidebarItem>
      </Sidebar>
      <div className="w-full flex flex-col lg:mt-28 md:mt-28 overflow-hidden h-fit ml-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Landing />} />
          <Route path="/svg" element={<SvgEditor />} />
          <Route path="/web" element={<WebDevEditor />} />
          <Route path="/ai" element={<AI />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
