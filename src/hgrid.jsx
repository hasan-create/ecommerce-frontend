
import React from "react";
import "./hgrid.css";

export default function Hgrid() {
  // Dynamically import all images from /ig folder
  const images = Object.values(
    import.meta.glob("/src/ig/*.{jpg,jpeg,png,webp,gif}", { eager: true })
  ).map((img) => img.default);

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {images.concat(images).map((src, index) => (
          <div className="carousel-card" key={index}>
            <img src={src} alt={`slide-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
