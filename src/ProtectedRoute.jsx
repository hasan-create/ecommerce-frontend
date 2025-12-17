// ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setChecking(false); // authenticated
        } else {
          navigate("/", { replace: true });
        }
      } catch (err) {
        navigate("/", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  if (checking) return null;

  return <>{children}</>;
}
