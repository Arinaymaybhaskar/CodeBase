import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white h-[10%] flex z-10 text-black border-b-2 border-black fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center px-5">
        <Link to="/" className="text-xl font-extrabold">
          CodeBase
        </Link>
        <div className="text-base font-semibold space-x-4">
          <Link to="/" className="hover:text-purple-700">
            Home
          </Link>
          <Link to="/compiler" className="hover:text-purple-700">
            Compiler
          </Link>
          <Link to="/svg" className="hover:text-purple-700">
            SVG Editor
          </Link>
          <Link to="/web" className="hover:text-purple-700">
            Web Dev Editor
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
