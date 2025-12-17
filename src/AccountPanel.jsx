
import React, { useEffect, useState } from "react";
import "./AccountPanel.css";

export default function AccountPanel({ isOpen, onClose, onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();

        if (data && data.email) setUser(data);
        else setUser({ email: "Guest" });
      } catch (err) {
        setUser({ email: "Guest" });
      }
    };
    fetchUser();
  }, []);

  if (!isOpen || !user) return null;

  const firstLetter = user.email ? user.email[0].toUpperCase() : "?";

  return (
    <div className={`account-panel ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="profile-circle">{firstLetter}</div>
      <p className="user-email">{user.email}</p>

      <button className="panel-btn" onClick={() => window.location.href = "/orders"}>
        Orders
      </button>

      <button className="panel-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
