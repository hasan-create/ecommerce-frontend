
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
