import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>© 2025 Govnary Gang</div>
          <div className={styles.socials}>
            <a
              href="https://www.dungeonsanddragons.ru/bookfull/5ed/5e%20Players%20Handbook%20-%20Книга%20игрока%20RUS.pdf"
              target="_blank"
              aria-label="Книга игрока"
              className={styles.icon}
            >
              ◈
            </a>
            <a
              href="https://www.dungeonsanddragons.ru/bookfull/Tasha's%20Cauldron%20of%20Everything%20RUS.pdf"
              target="_blank"
              aria-label="Книга Таши"
              className={styles.icon}
            >
              ✦
            </a>
            <a href="#" aria-label="YouTube" className={styles.icon}>
              ▶
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
