import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);
  // Проверяем, что setTheme определён
  if (!setTheme) {
    throw new Error("setTheme is not defined in ThemeContext");
  }
  // Проверяем, что theme определён
  if (theme === undefined) {
    throw new Error("theme is not defined in ThemeContext");
  }
  document.body.className = theme;
  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };
  return { theme, toggleTheme };
}