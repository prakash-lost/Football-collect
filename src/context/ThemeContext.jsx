import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // 1. Check saved user preference in localStorage
    const saved = localStorage.getItem("football_collect_theme");
    if (saved !== null) {
      return saved === "dark";
    }
    // 2. Default to true (Pitch Obsidian & Electric Lime)
    return true;
  });

  useEffect(() => {
    // Sync class on documentElement
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "dark";
    }
    localStorage.setItem("football_collect_theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
