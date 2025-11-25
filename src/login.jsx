// import "./login.css";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ email: "", password: "" });

//   const handleChange = (event) => {
//     setUser({ ...user, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const res = await fetch("http://localhost:3000/api/auth/login", {
//         method: "POST",
//         credentials: "include", // important: send cookie
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });

//       const data = await res.json();

//       if (res.status === 200) {
//         alert("Logged in successfully!");
//         navigate("/home");
//       } else {
//         alert(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       alert("Password or email is wrong");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="parentlog">
//           <div className="log">
//             <h2>Login</h2>
//             <label>Email</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             <input
//               placeholder="email"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//             />
//             <br />
//             <br />
//             <label>Password</label>
//             <input
//               placeholder="password"
//               name="password"
//               type="password"
//               value={user.password}
//               onChange={handleChange}
//             />
//             <br />
//             <br />
//             <button className="btnlogin" type="submit">
//               Login
//             </button>
//             <p>
//               I don't have an account?{" "}
//               <Link to="/Signup" className="Signup">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
// import "./login.css";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ email: "", password: "" });

//   const handleChange = (event) => {
//     setUser({ ...user, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const res = await fetch("http://localhost:3000/api/auth/login", {
//         method: "POST",
//         credentials: "include", // ✅ ensures token cookie is saved
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Logged in successfully!");
//         navigate("/home");
//       } else {
//         alert(data.message || "Username or password incorrect");
//       }
//     } catch (err) {
//       console.error("❌ Login error:", err);
//       alert("Server error during login");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="parentlog">
//           <div className="log">
//             <h2>Login</h2>
//             <label>Email</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             <input
//               placeholder="email"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//             />
//             <br />
//             <br />
//             <label>Password</label>
//             <input
//               placeholder="password"
//               name="password"
//               type="password"
//               value={user.password}
//               onChange={handleChange}
//             />
//             <br />
//             <br />
//             <button className="btnlogin" type="submit">
//               Login
//             </button>
//             <p>
//               I don't have an account?{" "}
//               <Link to="/Signup" className="Signup">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
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
      const res = await fetch("http://localhost:3000/api/auth/login", {
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
