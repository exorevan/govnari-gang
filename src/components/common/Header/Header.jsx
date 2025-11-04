import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Navbar from "../Navigation/Navbar.jsx";
import logo from "./favicon.ico"; // Импортируйте вашу картинку

export default function Header() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="Главная">
          <img src={logo} alt="Govnary Gang Logo" className={styles.logoMark} />
          <span className={styles.logoText}>Govnary Gang</span>
        </Link>

        <Navbar />

        <div className={styles.actions}>
          <form className={styles.search} onSubmit={onSubmit} role="search">
            <input
              type="text"
              placeholder="Поиск"
              aria-label="Поиск"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>
          <button className={styles.themeToggle} aria-label="Переключить тему">
            ★
          </button>
        </div>
      </div>
    </header>
  );
}
