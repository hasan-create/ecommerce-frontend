import "./About.css";
import about from "./img/about.jpg"; 

export default function About() {
  return (
    <div className="about-page">
      <div className="about-content">
        <div className="about-text">
          <h1>About NSH</h1>
          <p>
            Welcome to <strong>NSH</strong> — where style meets confidence.  
            We believe that fashion is more than just clothing; it’s an expression of who you are.
          </p>
          <p>
            Founded with the vision to redefine everyday fashion, NSH offers a
            wide range of apparel crafted with comfort, quality, and
            individuality in mind. From casual streetwear to elegant outfits,
            our designs bring together timeless style and modern trends.
          </p>
          <p>
            At NSH, we’re passionate about sustainable practices and responsible
            sourcing. Every piece you wear tells a story — one stitched with care,
            creativity, and commitment to craftsmanship.
          </p>
          <p className="signature">— The NSH Team</p>
        </div>

        <div className="about-image">
          <img src={about} alt="About NSH" />
        </div>
      </div>

      <div className="about-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Quality</h3>
            <p>We use premium fabrics and attention to detail in every stitch.</p>
          </div>
          <div className="value-card">
            <h3>Creativity</h3>
            <p>Each design is inspired by global trends and local artistry.</p>
          </div>
          <div className="value-card">
            <h3>Sustainability</h3>
            <p>We care for the planet with eco-friendly production choices.</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>We’re more than a brand — we’re a family of style lovers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
