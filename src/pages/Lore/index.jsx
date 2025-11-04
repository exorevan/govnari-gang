import React from "react";
import { Link } from "react-router-dom";

export default function LoreIndex() {
  return (
    <main>
      <h2>Lore</h2>
      <ul>
        <li><Link to="/lore/factions">Фракции</Link></li>
        <li><Link to="/lore/gods">Боги</Link></li>
        <li><Link to="/lore/history">История</Link></li>
        <li><Link to="/lore/legends">Легенды</Link></li>
      </ul>
    </main>
  );
}


