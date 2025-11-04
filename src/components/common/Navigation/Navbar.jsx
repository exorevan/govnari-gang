import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import NavDropdown from "./NavDropdown.jsx";
import navigation from "../../../config/navigation";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      {navigation.map((item) => (
        <div key={item.path} className={styles.item}>
          <Link to={item.path}>{item.label}</Link>
          {item.children?.length ? <NavDropdown items={item.children} /> : null}
        </div>
      ))}
    </nav>
  );
}
