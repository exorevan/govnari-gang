// src/pages/Media/Gallery/GalleryPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      setLoading(true);
      const indexResponse = await fetch("/data/media/gallery/index.json");
      if (!indexResponse.ok) throw new Error("Не удалось загрузить галерею");

      const albumIds = await indexResponse.json();
      const albumsData = await Promise.all(
        albumIds.map(async (id) => {
          const response = await fetch(`/data/media/gallery/${id}.json`);
          return response.ok ? response.json() : null;
        }),
      );

      setAlbums(albumsData.filter(Boolean));
      if (albumsData.length > 0) {
        setSelectedAlbum(albumsData[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18 }}>Загрузка галереи...</div>
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

  if (albums.length === 0) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Галерея</h2>
        <p style={{ opacity: 0.7 }}>Альбомы пока не добавлены</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh" }}>
      <section
        style={{
          padding: "24px",
          background: "linear-gradient(135deg, #1a1a1a, #0a0a0a)",
        }}
      >
        <h1 style={{ margin: "0 0 24px" }}>Галерея</h1>

        {/* Tabs для альбомов */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setSelectedAlbum(album)}
              style={{
                padding: "10px 20px",
                background:
                  selectedAlbum?.id === album.id
                    ? "rgba(212,175,55,0.2)"
                    : "#1a1a1a",
                border:
                  selectedAlbum?.id === album.id
                    ? "1px solid rgba(212,175,55,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#fff",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {album.title}
            </button>
          ))}
        </div>

        {/* Информация об альбоме */}
        {selectedAlbum && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 4 }}>
              {selectedAlbum.date}
            </div>
            <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.6 }}>
              {selectedAlbum.description}
            </p>
          </div>
        )}

        {/* Сетка изображений */}
        {selectedAlbum && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {selectedAlbum.images.map((image) => (
              <figure
                key={image.id}
                onClick={() => setLightboxImage(image)}
                style={{
                  margin: 0,
                  cursor: "pointer",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#121212",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={image.url}
                  alt={image.title}
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <figcaption style={{ padding: 12 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    {image.title}
                  </div>
                  {image.description && (
                    <div style={{ fontSize: 13, opacity: 0.8 }}>
                      {image.description}
                    </div>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              position: "relative",
            }}
          >
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              style={{
                maxWidth: "100%",
                maxHeight: "calc(90vh - 80px)",
                objectFit: "contain",
                borderRadius: 12,
              }}
            />
            <div
              style={{
                background: "rgba(0,0,0,0.8)",
                padding: 16,
                borderRadius: 8,
                marginTop: 16,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>
                {lightboxImage.title}
              </div>
              {lightboxImage.description && (
                <div style={{ fontSize: 14, opacity: 0.9 }}>
                  {lightboxImage.description}
                </div>
              )}
            </div>
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                position: "absolute",
                top: -40,
                right: 0,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                width: 32,
                height: 32,
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: 20,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
