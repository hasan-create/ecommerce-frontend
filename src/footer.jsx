
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-section contact">
        <h2>Contact Us</h2>
        <p>
          <i className="fa-solid fa-phone"></i> +91 93197 74321
        </p>
        <p>
          <i className="fa-regular fa-envelope"></i> nhs123@gmail.com
        </p>
      </div>

      <div className="footer-section follow">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="footer-section about">
        <h2>About</h2>
        <p>
          We bring you the latest trends in fashion and lifestyle. Explore our
          curated collections designed for comfort, confidence, and style.
        </p>
      </div>
    </div>
  );
}
