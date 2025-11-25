import React from "react";
import "./pages.css";

export default function FAQ() {
  return (
    <div className="page-container">
      <h1>Frequently Asked Questions - NSH</h1>

      <div className="faq-item">
        <h3>What is NSH?</h3>
        <p>NSH is a premium clothing brand offering stylish and high-quality apparel for men, women, and kids.</p>
      </div>

      <div className="faq-item">
        <h3>How do I place an order?</h3>
        <p>Browse products, add them to your cart, and complete your order through our secure checkout.</p>
      </div>

      <div className="faq-item">
        <h3>What are the shipping options?</h3>
        <p>We provide standard and express shipping. Estimated delivery times will be shown at checkout.</p>
      </div>

      <div className="faq-item">
        <h3>Can I return or exchange a product?</h3>
        <p>Yes! Check our return policy for eligibility and steps to return or exchange products.</p>
      </div>
    </div>
  );
}
