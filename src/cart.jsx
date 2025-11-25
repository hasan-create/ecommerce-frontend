
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./cart.css";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/cart", { withCredentials: true });
//         setCartItems(res.data.Products);
//       } catch (err) {
//         console.error(err);
//         alert("Please login first");
//       }
//     };
//     fetchCart();
//   }, []);

//   const removeFromCart = async (_id) => {
//     try {
//       const res = await axios.delete(`http://localhost:3000/api/cart/delete/${_id}`, { withCredentials: true });
//       setCartItems(res.data.cart.Products);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (cartItems.length === 0) {
//     return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Your cart is empty</h2>;
//   }

//   return (
//     <div className="cart-container">
//       <h1>Your Cart</h1>
//       {cartItems.map((item) => (
//         <div key={item._id} className="cart-item">
//           <Link
//             to={`/specs/${item._id}`}
//             style={{ textDecoration: "none", color: "inherit", display: "flex", gap: "20px" }}
//           >
//             <img
//               src={`http://localhost:3000/${item.image}`}
//               alt={item.name}
//               style={{ width: "100px", height: "100px", objectFit: "cover" }}
//             />
//             <div>
//               <h3>{item.name}</h3>
//               <p>Price: ${item.price}</p>
//               <p>Quantity: {item.quantity}</p>
//             </div>
//           </Link>
//           <button onClick={() => removeFromCart(item._id)}>Remove</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./cart.css";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   // ------------------- Fetch cart items -------------------
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/cart", {
//           withCredentials: true,
//         });
//         // Make sure you use the correct property name
//         setCartItems(res.data.Products || []);
//       } catch (err) {
//         console.error("Error fetching cart:", err);
//         alert("Please login first");
//       }
//     };
//     fetchCart();
//   }, []);

//   // ------------------- Remove item from cart -------------------
//   const removeFromCart = async (cartItemId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:3000/api/cart/delete/${cartItemId}`,
//         { withCredentials: true }
//       );
//       setCartItems(res.data.cart.Products || []);
//     } catch (err) {
//       console.error("Error removing item:", err);
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px" }}>
//         Your cart is empty
//       </h2>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <h1>Your Cart</h1>
//       {cartItems.map((item) => (
//         <div key={item._id} className="cart-item">
//           {/* 🔹 Use productId for Cardspecs link */}
//           <Link
//             to={`/specs/${item.productId}`}
//             style={{
//               textDecoration: "none",
//               color: "inherit",
//               display: "flex",
//               gap: "20px",
//             }}
//           >
//             <img
//               src={`http://localhost:3000/${item.image}`}
//               alt={item.name}
//               style={{ width: "100px", height: "100px", objectFit: "cover" }}
//             />
//             <div>
//               <h3>{item.name}</h3>
//               <p>Price: ${item.price}</p>
//               <p>Quantity: {item.quantity}</p>
//             </div>
//           </Link>
//           <button onClick={() => removeFromCart(item._id)}>Remove</button>
//         </div>
//       ))}
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./cart.css";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   // ------------------- Fetch cart items -------------------
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/cart", {
//           withCredentials: true,
//         });
//         setCartItems(res.data.Products || []); // fallback to empty array
//       } catch (err) {
//         console.error("Error fetching cart:", err);
//         alert("Please login first");
//       }
//     };
//     fetchCart();
//   }, []);

//   // ------------------- Remove item from cart -------------------
//   const removeFromCart = async (cartItemId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:3000/api/cart/delete/${cartItemId}`,
//         { withCredentials: true }
//       );
//       setCartItems(res.data.cart?.Products || []);
//     } catch (err) {
//       console.error("Error removing item:", err);
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px" }}>
//         Your cart is empty
//       </h2>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <h1>Your Cart</h1>
//       {cartItems.map((item) => (
//         <div key={item._id} className="cart-item">
//           {/* 🔹 Link to product spec using productId */}
//           <Link
//             to={`/specs/${item.productId}`} // MUST use productId
//             style={{
//               textDecoration: "none",
//               color: "inherit",
//               display: "flex",
//               gap: "20px",
//             }}
//           >
//             <img
//               src={`http://localhost:3000/${item.image}`}
//               alt={item.Name}
//               style={{ width: "100px", height: "100px", objectFit: "cover" }}
//             />
//             <div>
//               <h3>{item.Name}</h3>
//               <p>Price: ${item.price}</p>
//               <p>Quantity: {item.quantity}</p>
//             </div>
//           </Link>

//           <button onClick={() => removeFromCart(item._id)}>Remove</button>
//         </div>
//       ))}
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./cart.css";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   // ------------------- Fetch cart items -------------------
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/cart", {
//           withCredentials: true,
//         });
//         setCartItems(res.data.Products || []);
//       } catch (err) {
//         console.error("Error fetching cart:", err);
//         alert("Please login first");
//       }
//     };
//     fetchCart();
//   }, []);

//   // ------------------- Remove item from cart -------------------
//   const removeFromCart = async (productId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:3000/api/cart/delete/${productId}`,
//         { withCredentials: true }
//       );
//       setCartItems(res.data.cart?.Products || []);
//     } catch (err) {
//       console.error("Error removing item:", err);
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px" }}>
//         Your cart is empty
//       </h2>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <h1>Your Cart</h1>
//       {cartItems.map((item) => (
//         <div key={item.productId} className="cart-item">
//           <Link
//             to={`/specs/${item.productId}`}
//             style={{
//               textDecoration: "none",
//               color: "inherit",
//               display: "flex",
//               gap: "20px",
//             }}
//           >
//             <img
//               src={`http://localhost:3000/${item.image}`}
//               alt={item.Name}
//               style={{ width: "100px", height: "100px", objectFit: "cover" }}
//             />
//             <div>
//               <h3>{item.Name}</h3>
//               <p>Price: ${item.price}</p>
//               <p>Quantity: {item.quantity}</p>
//             </div>
//           </Link>
//           <button onClick={() => removeFromCart(item.productId)}>Remove</button>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/cart", { withCredentials: true });
        setCartItems(res.data.Products || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
        alert("Please login first");
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/cart/delete/${productId}`, {
        withCredentials: true,
      });
      setCartItems(res.data.cart?.Products || []);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (cartItems.length === 0)
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Your cart is empty</h2>;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.productId} className="cart-item">
          <Link
            to={`/specs/${item.productId}`}
            style={{ textDecoration: "none", color: "inherit", display: "flex", gap: "20px" }}
          >
            <img
              src={`http://localhost:3000/${item.image}`}
              alt={item.Name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div>
              <h3>{item.Name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </Link>
          <button onClick={() => removeFromCart(item.productId)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
