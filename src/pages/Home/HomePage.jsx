import React from "react";
import Hero from "../../components/common/Hero/Hero.jsx";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <Hero
        title="Песнь Золотого Пламени"
        subtitle="Хроники мира меча и магии. Легенды героев, тайны древних богов и города под звездами."
        height={600}
        backgroundImage="/assets/hero.jpg"
        ctaLabel="Начать путешествие"
        onCta={() => {}}
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
                    Короткое описание произошедшего. Без деталей и данных, только макет текста на две строки.
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
                { title: "Персонажи", desc: "Герои и их истории" },
                { title: "Мир", desc: "Города, локации, легенды" },
                { title: "Хроники", desc: "Сессии и ключевые события" },
                { title: "Знания", desc: "Боги, фракции, история" },
              ].map((x) => (
                <a href="#" className={styles.quickItem} key={x.title}>
                  <div className={styles.quickIcon}>⚜</div>
                  <div className={styles.quickTitle}>{x.title}</div>
                  <div className={styles.quickDesc}>{x.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}


