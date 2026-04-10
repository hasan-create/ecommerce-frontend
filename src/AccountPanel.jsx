// import React, { useEffect, useState } from 'react.js';
// import "./AccountPanel.css";

// export default function AccountPanel({ isOpen, onClose, onLogout }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//         });
//         const data = await res.json();

       
//         if (data && data.email) {
//           setUser(data);
//         } else {
//           setUser({ email: "Guest" }); 
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   if (!isOpen) return null;
//   if (!user) return null;

//   const firstLetter =
//     user && user.email ? user.email[0].toUpperCase() : "?";

//   return (
//     <div className={`account-panel ${isOpen ? "open" : ""}`}>
//       <button className="close-btn" onClick={onClose}>Ã—</button>
//       <div className="profile-circle">{firstLetter}</div>
//       <p className="user-email">{user.email}</p>

//       <button
//         className="panel-btn"
//         onClick={() => {
//           onClose();
//           window.location.href = "/orders";
//         }}
//       >
//         Orders
//       </button>

//       <button className="panel-btn" onClick={onLogout}>
//         Logout
//       </button>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "./AccountPanel.css";
import { apiUrl } from "./utils/url";

export default function AccountPanel({ isOpen, onClose, onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(apiUrl("/api/auth/me"), {
          credentials: "include",
        });
        const data = await res.json();

        if (data && data.email) setUser(data);
        else setUser({ email: "Guest" });
      } catch {
        setUser({ email: "Guest" });
      }
    };
    fetchUser();
  }, []);

  if (!isOpen || !user) return null;

  const firstLetter = user.email ? user.email[0].toUpperCase() : "?";

  return (
    <div className={`account-panel ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>Ã—</button>
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

