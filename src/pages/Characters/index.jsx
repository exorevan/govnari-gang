import React from "react";
import { Link } from "react-router-dom";

export default function CharactersIndex() {
  return (
    <main>
      <h2>Characters</h2>
      <ul>
        <li><Link to="/characters/players">Игровые персонажи</Link></li>
        <li><Link to="/characters/npcs">НПЦ</Link></li>
        <li><Link to="/characters/allies">Союзники</Link></li>
        <li><Link to="/characters/enemies">Враги</Link></li>
        <li><Link to="/characters/deceased">Павшие</Link></li>
      </ul>
    </main>
  );
}


