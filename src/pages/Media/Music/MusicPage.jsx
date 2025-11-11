// src/pages/Media/Music/MusicPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function MusicPage() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    loadMusic();
  }, []);

  async function loadMusic() {
    try {
      setLoading(true);
      const indexResponse = await fetch("/data/media/music/index.json");
      if (!indexResponse.ok) throw new Error("Не удалось загрузить музыку");

      const playlistIds = await indexResponse.json();
      const playlistsData = await Promise.all(
        playlistIds.map(async (id) => {
          const response = await fetch(`/data/media/music/${id}.json`);
          return response.ok ? response.json() : null;
        }),
      );

      setPlaylists(playlistsData.filter(Boolean));
      if (playlistsData.length > 0) {
        setSelectedPlaylist(playlistsData[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function playTrack(track) {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
  }

  function togglePlayPause() {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18 }}>Загрузка музыки...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ color: "#ff4d4d", marginBottom: 16 }}>
          Ошибка: {error}
        </div>
        <Link to="/media" style={{ color: "#4da3ff" }}>
          ← Вернуться к медиа
        </Link>
      </main>
    );
  }

  if (playlists.length === 0) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Музыка</h2>
        <p style={{ opacity: 0.7 }}>Плейлисты пока не добавлены</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 120 }}>
      <section style={{ padding: 24 }}>
        <h1 style={{ margin: "0 0 24px" }}>Музыка кампании</h1>

        {/* Плейлисты */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 32,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => setSelectedPlaylist(playlist)}
              style={{
                padding: "10px 20px",
                background:
                  selectedPlaylist?.id === playlist.id
                    ? "rgba(212,175,55,0.2)"
                    : "#1a1a1a",
                border:
                  selectedPlaylist?.id === playlist.id
                    ? "1px solid rgba(212,175,55,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#fff",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {playlist.title}
            </button>
          ))}
        </div>

        {/* Информация о плейлисте */}
        {selectedPlaylist && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: 24,
              marginBottom: 32,
              background: "#121212",
              padding: 24,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {selectedPlaylist.cover && (
              <img
                src={selectedPlaylist.cover}
                alt={selectedPlaylist.title}
                style={{
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            )}
            <div>
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  opacity: 0.7,
                  marginBottom: 8,
                }}
              >
                {selectedPlaylist.type || "Плейлист"}
              </div>
              <h2 style={{ margin: "0 0 12px", fontSize: 32 }}>
                {selectedPlaylist.title}
              </h2>
              <p style={{ margin: "0 0 16px", opacity: 0.9, lineHeight: 1.6 }}>
                {selectedPlaylist.description}
              </p>
              <div style={{ fontSize: 14, opacity: 0.7 }}>
                {selectedPlaylist.tracks?.length || 0} треков
              </div>
            </div>
          </div>
        )}

        {/* Список треков */}
        {selectedPlaylist?.tracks && (
          <div
            style={{
              background: "#0a0a0a",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {selectedPlaylist.tracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => playTrack(track)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr auto auto",
                  gap: 16,
                  padding: 16,
                  borderBottom:
                    index < selectedPlaylist.tracks.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                  cursor: "pointer",
                  background:
                    currentTrack?.id === track.id
                      ? "rgba(212,175,55,0.1)"
                      : "transparent",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    currentTrack?.id === track.id
                      ? "rgba(212,175,55,0.15)"
                      : "rgba(255,255,255,0.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    currentTrack?.id === track.id
                      ? "rgba(212,175,55,0.1)"
                      : "transparent")
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    opacity: 0.7,
                  }}
                >
                  {currentTrack?.id === track.id && isPlaying
                    ? "▶"
                    : index + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    {track.title}
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.7 }}>
                    {track.artist}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 13,
                    opacity: 0.7,
                  }}
                >
                  {track.duration}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    opacity: 0.7,
                  }}
                >
                  {currentTrack?.id === track.id && (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(212,175,55,0.2)",
                        borderRadius: "50%",
                        fontSize: 18,
                      }}
                    >
                      ♪
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Плеер */}
      {currentTrack && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#0a0a0a",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "16px 24px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 24,
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              {currentTrack.title}
            </div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>
              {currentTrack.artist}
            </div>
          </div>
          <button
            onClick={togglePlayPause}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.2)",
              border: "1px solid rgba(212,175,55,0.5)",
              color: "#d4af37",
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>
      )}

      {/* Аудио элемент */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </main>
  );
}
