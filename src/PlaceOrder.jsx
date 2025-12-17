
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PlaceOrder() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Card");

  const [form, setForm] = useState({
    fullName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    pincode: "",
  });


  const buyNowProduct = location.state?.product;

  
  const fetchCart = async () => {
    if (buyNowProduct) {
   
      const p = {
        Name: buyNowProduct.name || buyNowProduct.Name || "Product",
        price: buyNowProduct.price,
        quantity: 1,
      };
      setCartItems([p]);
      return;
    }
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
        withCredentials: true,
      });
      // Expect res.data.Products
      const prods = res.data?.Products || [];
      // Normalize keys
      const normalized = prods.map((p) => ({
        Name: p.Name || p.name || "Product",
        price: p.price,
        quantity: p.quantity || 1,
      }));
      setCartItems(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = subtotal * 0.01;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in form) {
      if (!form[key]) {
        alert(`Please fill out the ${key.replace(/([A-Z])/g, " $1")} field.`);
        return false;
      }
    }
    if (cartItems.length === 0) {
      alert("No products to order.");
      return false;
    }
    return true;
  };

  const placeOrder = async () => {
    if (!validateForm()) return;

    try {
   
      const address = {
        street: form.street,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        country: form.country,
        pincode: form.pincode,
      };

      const orderPayload = {
    
        fullName: form.fullName,
        lastName: form.lastName,
        email: form.email,
        address, 
        paymentMethod,
        products: cartItems,
        shippingAmount: Number(shipping.toFixed(2)),

        clientTotalAmount: Number(total.toFixed(2)),
        usedCart: !buyNowProduct, 
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order/place`,
        orderPayload,
        { withCredentials: true }
      );

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Failed to place order";
      alert(msg);
    }
  };

  if (cartItems.length === 0)
    return <h2 style={{ textAlign: "center" }}>No products to order</h2>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "40px",
        padding: "40px",
        maxWidth: "1200px",
        margin: "auto",
        flexWrap: "wrap",
      }}
    >
      {}
      <div style={{ flex: "1 1 55%", minWidth: "350px" }}>
        <h2>Shipping Information</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={form.street}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={form.zipCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {}
      <div
        style={{
          flex: "1 1 35%",
          minWidth: "320px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "25px",
          height: "fit-content",
          backgroundColor: "#fafafa",
        }}
      >
        <h2>Order Summary</h2>
        <div>
          {cartItems.map((p, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>
                {p.Name || p.name} x {p.quantity}
              </span>
              <span>${(p.price * p.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr />
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Shipping (1%): ${shipping.toFixed(2)}</p>
        <h3>Total: ${total.toFixed(2)}</h3>

        <h4 style={{ marginTop: "20px" }}>Payment Method</h4>
        <div>
          <label>
            <input
              type="radio"
              name="payment"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Card
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Cash on Delivery
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            UPI
          </label>
        </div>

        <button
          onClick={placeOrder}
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "14px 0",
            width: "100%",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "25px",
            cursor: "pointer",
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
