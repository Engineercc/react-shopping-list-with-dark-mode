import React, { useState, useEffect } from "react";
import "./Darkmode.css";
const Theme = () => {
  const [themeSign, setThemeSign] = useState(false);
  const [themeValue, setThemeValue] = useState("");
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
 
  if (themeValue === lightTheme || themeValue === darkTheme) {
    body.classList.add(themeValue);
  } else {
    body.classList.add(lightTheme);
  }
  const switchTheme = () => {
    if (!themeSign) {
      body.classList.replace(darkTheme, lightTheme);
      localStorage.setItem("theme", "light");
      setThemeValue(lightTheme);
    } else {
      body.classList.replace(lightTheme, darkTheme);
      localStorage.setItem("theme", "dark");
      setThemeValue(darkTheme);
    }
  };

  useEffect(() => {
    switchTheme();
  });
  return (
    <div className="section-theme">
      <label className="dark-mode-checkbox">
        <input
          type="checkbox"
          checked={themeSign}
          onChange={() => setThemeSign(!themeSign)}
        />
        <span className="theme-changer"></span>
      </label>
    </div>
  );
};

export default Theme;
