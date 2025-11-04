import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Navbar from "../Navigation/Navbar.jsx";
import logo from "./favicon.ico"; // Импортируйте вашу картинку

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="Главная">
          <img src={logo} alt="Govnary Gang Logo" className={styles.logoMark} />
          <span className={styles.logoText}>Govnary Gang</span>
        </Link>

        <Navbar />

        <div className={styles.actions}>
          <div className={styles.search}>
            <input type="text" placeholder="Поиск" aria-label="Поиск" />
          </div>
          <button className={styles.themeToggle} aria-label="Переключить тему">
            ★
          </button>
        </div>
      </div>
    </header>
  );
}
