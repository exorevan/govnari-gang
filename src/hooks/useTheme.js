import { useContext } from "react";
import { ThemeContext } from "../app/providers/ThemeProvider.jsx";

export function useTheme() {
  return useContext(ThemeContext);
}


