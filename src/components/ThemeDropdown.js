import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../constants/customStyles";

//! They were not working.
const excludedThemes = [
  "cobalt2",
  "dracula",
  "github dark",
  "github light",
  "nord",
];

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  const filteredThemes = Object.entries(monacoThemes)
    .filter(([themeId]) => !excludedThemes.includes(themeId))
    .map(([themeId, themeName]) => ({
      label: themeName,
      value: themeId,
      key: themeId,
    }));

  return (
    <Select
      placeholder={`Theme`}
      options={filteredThemes}
      value={theme}
      styles={customStyles}
      className="font-medium"
      onChange={handleThemeChange}
    />
  );
};

export default ThemeDropdown;
