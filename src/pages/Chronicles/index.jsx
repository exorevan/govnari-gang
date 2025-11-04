import React from "react";
import { Link } from "react-router-dom";

export default function ChroniclesIndex() {
  return (
    <main>
      <h2>Chronicles</h2>
      <ul>
        <li>
          <Link to="/chronicles/sessions">Сессии</Link>
        </li>
        <li>
          <Link to="/chronicles/key-events">Ключевые события</Link>
        </li>
        <li>
          <Link to="/chronicles/timeline">Временная шкала</Link>
        </li>
        <li>
          <Link to="/chronicles/quotes">Цитаты</Link>
        </li>
      </ul>
    </main>
  );
}
