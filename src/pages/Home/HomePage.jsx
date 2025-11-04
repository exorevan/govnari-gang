import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../../components/common/Hero/Hero.jsx";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Hero
        title="Приветствую вас, Говнари!"
        subtitle="Хроники мира меча и магии. Легенды героев, тайны древних богов и города под звездами."
        height={600}
        backgroundImage="/assets/hero.jpg"
        ctaLabel="Начать путешествие"
        onCta={() => navigate("/chronicles/sessions")}
      />

      <main>
        <section className="section">
          <h2 className="section-title">Последние события</h2>
          <div className="grid-3">
            {[1, 2, 3].map((i) => (
              <article className={`card ${styles.eventCard}`} key={i}>
                <div className={styles.eventImage} />
                <div className={styles.eventBody}>
                  <h3 className={styles.eventTitle}>Битва у Старого моста</h3>
                  <div className={styles.eventDate}>12 Марта, 1492 DR</div>
                  <p className={styles.eventDesc}>
                    Короткое описание произошедшего. Без деталей и данных,
                    только макет текста на две строки.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.quickLinksSection}>
          <div className="container">
            <div className={styles.quickGrid}>
              {[
                {
                  title: "Персонажи",
                  desc: "Герои и их истории",
                  path: "/characters",
                },
                {
                  title: "Мир",
                  desc: "Города, локации, легенды",
                  path: "/world",
                },
                {
                  title: "Хроники",
                  desc: "Сессии и ключевые события",
                  path: "/chronicles",
                },
                {
                  title: "Знания",
                  desc: "Боги, фракции, история",
                  path: "/lore",
                },
              ].map((x) => (
                <Link to={x.path} className={styles.quickItem} key={x.title}>
                  <div className={styles.quickIcon}>⚜</div>
                  <div className={styles.quickTitle}>{x.title}</div>
                  <div className={styles.quickDesc}>{x.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
