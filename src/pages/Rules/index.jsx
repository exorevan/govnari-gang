import React from "react";
import { Link } from "react-router-dom";

export default function RulesIndex() {
  return (
    <main>
      <h2>Rules</h2>
      <ul>
        <li>
          <Link to="/rules/homebrew">Хоумбрю</Link>
        </li>
        <li>
          <Link to="/rules/mechanics">Механики</Link>
        </li>
      </ul>
    </main>
  );
}
