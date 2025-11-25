import React from "react";
import "./pages.css";

export default function HelpCenter() {
  return (
    <div className="page-container">
      <h1>Help Center - NSH</h1>
      <p>If you need assistance, our support team is here to help.</p>

      <div className="contact-info">
        <p><strong>Email:</strong> support@nsh.com</p>
        <p><strong>Phone:</strong> +91 93197 74321</p>
        <p><strong>Working Hours:</strong> Mon-Sat 10:00 AM - 6:00 PM</p>
      </div>

      <div className="help-guide">
        <h3>Popular Help Topics:</h3>
        <ul>
          <li>Order Tracking</li>
          <li>Returns & Exchanges</li>
          <li>Product Information</li>
          <li>Payment Options</li>
        </ul>
      </div>
    </div>
  );
}
