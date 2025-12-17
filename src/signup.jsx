
import "./signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [newuser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const newUserStateChange = (event) => {
    setNewUser({ ...newuser, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newuser);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newuser),
      });

      const data = await res.json();

      // ✅ Better alert message (no [object Object])
      alert(data.message || data || "Signup response received");

      // ✅ Navigate to login page if successful
      if (res.ok && data.message && data.message.toLowerCase().includes("successful")) {
        navigate("/");
      }

    } catch (err) {
      console.error("❌ Signup error:", err);
      alert("Something went wrong during signup");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="parentsign">
          <div className="sign">
            <h2>Sign up</h2>

            <label id="username">Username</label>
            <input
              placeholder="username"
              name="username"
              value={newuser.username}
              onChange={newUserStateChange}
            />
            <br />
            <br />

            <label id="email">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email&nbsp;</label>
            <input
              placeholder="email"
              name="email"
              type="email"
              value={newuser.email}
              onChange={newUserStateChange}
            />
            <br />
            <br />

            <label id="password">Password</label>
            <input
              placeholder="password"
              name="password"
              type="password"
              value={newuser.password}
              onChange={newUserStateChange}
            />
            <br />
            <br />

            <button className="btnsign" type="submit">
              Signup
            </button>

            <p>
              I have an account?{" "}
              <Link to="/" className="lo">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
