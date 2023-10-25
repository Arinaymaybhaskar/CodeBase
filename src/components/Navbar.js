// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white w-full fixed top-0">
      <div className="container mx-auto flex justify-evenly">
        <Link to="/">Home</Link>
        <Link to="/compiler">Compiler</Link>
        <Link to="/svg">SVG Editor</Link>
        <Link to="/web">HTML CSS JS</Link>
      </div>
    </nav>
  );
};

export default Navbar;
