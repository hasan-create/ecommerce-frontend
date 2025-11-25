// import "./hgrid.css";
// import React from "react";

// export default function Hgrid() {

//   const imageModules = import.meta.glob("./img/*.{jpg,jpeg,png}", { eager: true });
//   const images = Object.values(imageModules).map((mod) => mod.default);
//   const [currentIndex, setCurrentIndex] = React.useState(0);

//   React.useEffect(() => {
//     if (images.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   console.log("Loaded images:", images);

//   return (
//     <div className="hgrid">
//       <div className="image-container">
//         {images.length === 0 ? (
//           <p style={{ color: "red", textAlign: "center" }}>⚠️ No images found!</p>
//         ) : (
//           images.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`slide-${index}`}
//               className={`slide ${index === currentIndex ? "active" : ""}`}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
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
