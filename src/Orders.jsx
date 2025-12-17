import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TrackOrder.css"; 

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order`, {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const handleCancel = async (orderId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/order/${orderId}/status`,
        { status: "Cancelled" },
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "Cancelled" } : o))
      );
      alert("Order cancelled successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

 
  const handleTrack = (order) => {
    navigate("/track-order", { state: { orderId: order._id } });
  };

  if (!orders || orders.length === 0)
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>No orders placed yet</h2>;

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "40px" }}>
      <h1>My Orders</h1>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: "20px",
            paddingBottom: "10px",
          }}
        >
          <h3>Order ID: {order._id}</h3>
          <p>Status: {order.status}</p>
          <p>Payment: {order.paymentMethod}</p>
          <p>
            Customer: {order.fullName} {order.lastName} — {order.email}
          </p>
          <p>
            Address: {order.address.street}, {order.address.city},{" "}
            {order.address.state}, {order.address.country} — ZIP: {order.address.zipCode} / PIN: {order.address.pincode}
          </p>

          <h4>Products:</h4>
          {order.products.map((p, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span>{p.Name} x {p.quantity}</span>
              <span>${(p.price * p.quantity).toFixed(2)}</span>
            </div>
          ))}

          <h4>Total: ${order.totalAmount.toFixed(2)}</h4>

          <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
            {order.status !== "Cancelled" && (
              <button
                onClick={() => handleCancel(order._id)}
                className="track-order-btn"
                style={{ backgroundColor: "#f44336" }}
              >
                Cancel Order
              </button>
            )}

            <button
              onClick={() => handleTrack(order)}
              className="track-order-btn"
            >
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
