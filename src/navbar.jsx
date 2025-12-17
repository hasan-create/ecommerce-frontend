
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountPanel from "./AccountPanel.jsx";
import "./navbar.css";

export default function Navbar() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include", // important for cookies!
      });

      if (!res.ok) {
        console.error("Logout error:", res.status);
        return;
      }

      // Optional: clear any local states related to user
      setIsPanelOpen(false);

      // Redirect to login after logout
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="navp">
      <h1 className="brand">
        <i>Nsh</i>
      </h1>

      <nav className="nav">
        <ul>
          <li>
            <Link to="/home" id="home">Home</Link>
          </li>
          <li>
            <Link to="/Trends" className="Trends">Trends</Link>
          </li>

          <Link to="/about" className="about">
            <li>About</li>
          </Link>

          <li>
            <Link to="/Admin" className="Admin">Admin</Link>
          </li>

          <li>
            <Link to="/Cart" className="Cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </li>

          <li>
            <i
              className="fa-solid fa-user profile"
              style={{ cursor: "pointer" }}
              onClick={() => setIsPanelOpen(true)}
            ></i>
          </li>
        </ul>
      </nav>

      <AccountPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}
