
import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Logged in successfully!");
        navigate("/home", { replace: true });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error during login");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="parentlog">
          <div className="log">
            <h2>Login</h2>

            <label>Email</label>&nbsp;
            <input name="email" placeholder="email" value={user.email} onChange={handleChange} />
<br></br><br></br>
            <label>Password</label>&nbsp;
            <input
              name="password"
              type="password"
              placeholder="password"
              value={user.password}
              onChange={handleChange}
            />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<br></br><br></br>
            <button className="btnlogin" type="submit">
              Login
            </button>
<br></br>
            <p>
              I don't have an account?
              <Link to="/Signup" className="Signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
