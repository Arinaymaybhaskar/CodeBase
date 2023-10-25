// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white w-full fixed top-0">
      <div className="container mx-auto flex justify-evenly">
      <li><Link to="/">Home</Link></li>
        <li><Link to="/compiler">Compiler</Link></li>
        <li><Link to="/svg">SVG Editor</Link></li>
        <li><Link to="/web">HTML CSS JS</Link></li>
      </div>
    </nav>
  );
};

export default Navbar;
