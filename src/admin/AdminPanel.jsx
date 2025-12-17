// AdminPanel.jsx
import React, { useState, useEffect } from "react";
import Additem from "./additem.jsx";
import axios from "axios";
import "./AdminPanel.css";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("addItem");
  const [orders, setOrders] = useState([]);

  // Fetch orders for admin
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/admin`, {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
  }, [activeTab]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/order/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      // update local state
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <button
          className={activeTab === "addItem" ? "active" : ""}
          onClick={() => setActiveTab("addItem")}
        >
          Add Item
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "addItem" && <Additem />}
        {activeTab === "orders" && (
          <div className="admin-orders">
            <h2>All Orders</h2>
            {orders.length === 0 && <p>No orders found.</p>}
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <h3>Order ID: {order._id}</h3>
                <p>
                  Customer: {order.fullName} {order.lastName} — {order.email}
                </p>
                <p>
                  Address: {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country} — ZIP:{" "}
                  {order.address.zipCode} / PIN: {order.address.pincode}
                </p>
                <h4>Products:</h4>
                {order.products.map((p, idx) => (
                  <div
                    key={idx}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>
                      {p.Name} x {p.quantity}
                    </span>
                    <span>${(p.price * p.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <h4>Total: ${order.totalAmount.toFixed(2)}</h4>
                <label>
                  Status:{" "}
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Placed">Placed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
