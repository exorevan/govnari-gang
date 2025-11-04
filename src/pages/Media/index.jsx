import React from "react";
import { Link } from "react-router-dom";

export default function MediaIndex() {
  return (
    <main>
      <h2>Media</h2>
      <ul>
        <li>
          <Link to="/media/gallery">Галерея</Link>
        </li>
        <li>
          <Link to="/media/music">Музыка</Link>
        </li>
      </ul>
    </main>
  );
}
