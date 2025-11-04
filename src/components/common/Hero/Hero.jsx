import React from "react";
import styles from "./Hero.module.css";

export default function Hero({
  title,
  subtitle,
  height = 600,
  backgroundImage = "/assets/hero.jpg",
  ctaLabel,
  onCta,
}) {
  return (
    <section
      className={styles.hero}
      style={{
        minHeight: height,
        backgroundImage: `linear-gradient(to bottom, rgba(26,26,26,0.3), rgba(26,26,26,0.8)), url('${backgroundImage}')`,
      }}
    >
      <div className={styles.content}>
        {title ? <h1 className={styles.title}>{title}</h1> : null}
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        {ctaLabel ? (
          <button className="btn btn-primary" onClick={onCta}>
            {ctaLabel}
          </button>
        ) : null}
      </div>
    </section>
  );
}
