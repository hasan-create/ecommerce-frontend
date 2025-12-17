import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TrackOrder.css";

export default function TrackOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/${orderId}`, { withCredentials: true });
        setOrder(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch order details");
        navigate("/orders");
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading order...</h2>;

  return (
    <div className="track-order-container">
      <h1>Track Order</h1>
      <div className="order-details">
        <h3>Order ID: {order._id}</h3>
        <p>Status: <span className={`status-${order.status.replace(/\s/g, "-").toLowerCase()}`}>{order.status}</span></p>
        <p>Payment Method: {order.paymentMethod}</p>
        <p>Customer: {order.fullName} {order.lastName} — {order.email}</p>
        <p>
          Address: {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} — ZIP: {order.address.zipCode} / PIN: {order.address.pincode}
        </p>

        <h4>Products:</h4>
        <div className="products-list">
          {order.products.map((p, idx) => (
            <div key={idx} className="product-card">
              <span>{p.Name} x {p.quantity}</span>
              <span>${(p.price * p.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <h4>Total: ${order.totalAmount.toFixed(2)}</h4>
      </div>
      <button className="track-order-btn" onClick={() => navigate("/orders")}>Back to Orders</button>
    </div>
  );
}
