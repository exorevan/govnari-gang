import React from "react";
import { Link } from "react-router-dom";

export default function WorldIndex() {
  return (
    <main>
      <h2>World</h2>
      <ul>
        <li>
          <Link to="/world/cities">Города</Link>
        </li>
        <li>
          <Link to="/world/geography">География</Link>
        </li>
        <li>
          <Link to="/world/dungeons">Подземелья</Link>
        </li>
        <li>
          <Link to="/world/maps">Карты</Link>
        </li>
      </ul>
    </main>
  );
}
