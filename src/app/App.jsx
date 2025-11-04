import React from "react";
import styles from "./App.module.css";
import RoutesRoot from "../routes/routes.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import Header from "../components/common/Header/Header.jsx";
import Navbar from "../components/common/Navigation/Navbar.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Header />
        <Navbar />
        <RoutesRoot />
      </div>
    </ThemeProvider>
  );
}


