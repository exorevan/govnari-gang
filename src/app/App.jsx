import React from "react";
import styles from "./App.module.css";
import RoutesRoot from "../routes/routes.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import Header from "../components/common/Header/Header.jsx";
import Footer from "../components/common/Footer/Footer.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Header />
        <div className={styles.content}>
          <RoutesRoot />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
