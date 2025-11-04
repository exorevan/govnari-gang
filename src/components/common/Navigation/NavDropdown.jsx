import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function NavDropdown({ items = [] }) {
  return (
    <div className={styles.dropdown}>
      {items.map((it) => (
        <Link key={it.path} to={it.path} className={styles.dropdownItem}>
          {it.label}
        </Link>
      ))}
    </div>
  );
}
