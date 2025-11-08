import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home/HomePage.jsx";
// Characters
import CharactersIndex from "../pages/Characters/index.jsx";
import PlayerCharactersPage from "../pages/Characters/PlayerCharacters/PlayerCharactersPage.jsx";
import PlayerCharacterDetail from "../pages/Characters/PlayerCharacters/PlayerCharacterDetail.jsx";
import NPCsPage from "../pages/Characters/NPCs/NPCsPage.jsx";
import NPCDetail from "../pages/Characters/NPCs/NPCDetail.jsx";
import AlliesPage from "../pages/Characters/Allies/AlliesPage.jsx";
import EnemiesPage from "../pages/Characters/Enemies/EnemiesPage.jsx";
import DeceasedPage from "../pages/Characters/Deceased/DeceasedPage.jsx";
// World
import WorldIndex from "../pages/World/index.jsx";
import CitiesPage from "../pages/World/Cities/CitiesPage.jsx";
import CityDetail from "../pages/World/Cities/CityDetail.jsx";
import GeographyPage from "../pages/World/Geography/GeographyPage.jsx";
import DungeonsPage from "../pages/World/Dungeons/DungeonsPage.jsx";
import DungeonDetail from "../pages/World/Dungeons/DungeonDetail.jsx";
import EstablishmentsPage from "../pages/World/Establishments/EstablishmentsPage.jsx";
import EstablishmentDetail from "../pages/World/Establishments/EstablishmentDetail.jsx";
import MapsPage from "../pages/World/Maps/MapsPage.jsx";
// Chronicles
import ChroniclesIndex from "../pages/Chronicles/index.jsx";
import SessionsPage from "../pages/Chronicles/AllSessions/SessionsPage.jsx";
import SessionDetail from "../pages/Chronicles/AllSessions/SessionDetail.jsx";
import KeyEventsPage from "../pages/Chronicles/KeyEvents/KeyEventsPage.jsx";
import TimelinePage from "../pages/Chronicles/Timeline/TimelinePage.jsx";
import QuotesPage from "../pages/Chronicles/Quotes/QuotesPage.jsx";
// Lore
import LoreIndex from "../pages/Lore/index.jsx";
import FractionsPage from "../pages/Lore/Fractions/FractionsPage.jsx";
import FractionDetail from "../pages/Lore/Fractions/FractionDetail.jsx";
import GodsPage from "../pages/Lore/Gods/GodsPage.jsx";
import GodDetail from "../pages/Lore/Gods/GodDetail.jsx";
import HistoryPage from "../pages/Lore/History/HistoryPage.jsx";
import LegendsPage from "../pages/Lore/Legends/LegendsPage.jsx";
// Rules
import RulesIndex from "../pages/Rules/index.jsx";
import HomebrewPage from "../pages/Rules/Homebrew/HomebrewPage.jsx";
import MechanicsPage from "../pages/Rules/Mechanics/MechanicsPage.jsx";
// Media
import MediaIndex from "../pages/Media/index.jsx";
import GalleryPage from "../pages/Media/Gallery/GalleryPage.jsx";
import MusicPage from "../pages/Media/Music/MusicPage.jsx";
// Search
import SearchResultsPage from "../pages/Search/SearchResultsPage.jsx";

export default function RoutesRoot() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/characters" element={<CharactersIndex />} />
      <Route path="/characters/players" element={<PlayerCharactersPage />} />
      <Route
        path="/characters/players/:id"
        element={<PlayerCharacterDetail />}
      />
      <Route path="/characters/npcs" element={<NPCsPage />} />
      <Route path="/characters/npcs/:id" element={<NPCDetail />} />
      <Route path="/characters/allies" element={<AlliesPage />} />
      <Route path="/characters/enemies" element={<EnemiesPage />} />
      <Route path="/characters/deceased" element={<DeceasedPage />} />

      <Route path="/world" element={<WorldIndex />} />
      <Route path="/world/cities" element={<CitiesPage />} />
      <Route path="/world/cities/:id" element={<CityDetail />} />
      <Route path="/world/geography" element={<GeographyPage />} />
      <Route path="/world/dungeons" element={<DungeonsPage />} />
      <Route path="/world/dungeons/:id" element={<DungeonDetail />} />
      <Route path="/world/establishments" element={<EstablishmentsPage />} />
      <Route
        path="/world/establishments/:id"
        element={<EstablishmentDetail />}
      />
      <Route path="/world/maps" element={<MapsPage />} />

      <Route path="/chronicles" element={<ChroniclesIndex />} />
      <Route path="/chronicles/sessions" element={<SessionsPage />} />
      <Route path="/chronicles/sessions/:id" element={<SessionDetail />} />
      <Route path="/chronicles/key-events" element={<KeyEventsPage />} />
      <Route path="/chronicles/timeline" element={<TimelinePage />} />
      <Route path="/chronicles/quotes" element={<QuotesPage />} />

      <Route path="/lore" element={<LoreIndex />} />
      <Route path="/lore/fractions" element={<FractionsPage />} />
      <Route path="/lore/fractions/:id" element={<FractionDetail />} />
      <Route path="/lore/gods" element={<GodsPage />} />
      <Route path="/lore/gods/:id" element={<GodDetail />} />
      <Route path="/lore/history" element={<HistoryPage />} />
      <Route path="/lore/legends" element={<LegendsPage />} />

      <Route path="/rules" element={<RulesIndex />} />
      <Route path="/rules/homebrew" element={<HomebrewPage />} />
      <Route path="/rules/mechanics" element={<MechanicsPage />} />

      <Route path="/media" element={<MediaIndex />} />
      <Route path="/media/gallery" element={<GalleryPage />} />
      <Route path="/media/music" element={<MusicPage />} />

      <Route path="/search" element={<SearchResultsPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
