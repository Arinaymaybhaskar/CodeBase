// src/components/Navbar.js
import React from "react";
import ThemeDropdown from "./ThemeDropdown";

const Navbar = ({ onBack, option }) => {
  return (
    <nav className="bg-gray-800 p-4 text-white w-full fixed top-0">
      <div className="container mx-auto flex justify-evenly">
        {option && (
          <button
            className="text-white"
            onClick={onBack} // Use onBack as onClick handler
          >
            <svg
              className="svg-icon" // Added class name
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" fill="#ffffff"/>
            </svg>
          </button>
        )}
        Navbar Content
      </div>
    </nav>
  );
};

export default Navbar;
