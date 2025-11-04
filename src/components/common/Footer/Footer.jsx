import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>© 2025 Govnary Gang</div>
          <div className={styles.socials}>
            <a href="#" aria-label="Discord" className={styles.icon}>
              ◈
            </a>
            <a href="#" aria-label="Twitter" className={styles.icon}>
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
