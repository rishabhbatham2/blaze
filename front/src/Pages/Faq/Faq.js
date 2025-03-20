import React, { useEffect } from "react";

export default function Faq() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  }, []);

  return (
    <div className="maincont">
      <div className="privacy-policy-container">
        <div className="privacy-policy-header">
          <h1 className="privacy-policy-title">Frequently Asked Questions (FAQ)</h1>
          <p className="privacy-policy-subtitle">
            Find answers to common questions about Blaze Store, our products, and services.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">1. What is Blaze Store?</h2>
          <p className="privacy-policy-text">
            Blaze Store is a fashion-forward online clothing brand offering a wide range of stylish
            apparel for men and women. We strive to deliver high-quality, trendy clothing that
            empowers individuals to express their unique style.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">2. How can I place an order?</h2>
          <p className="privacy-policy-text">
            Placing an order is simple! Just follow these steps:
          </p>
          <ul className="privacy-policy-text">
            <li>Browse our collections and select the items you like.</li>
            <li>Choose your preferred size and color.</li>
            <li>Click “Add to Cart” and then proceed to checkout.</li>
            <li>
              Enter your delivery details and payment information to complete your purchase. If you
              have any issues, feel free to contact our customer service for assistance.
            </li>
          </ul>
        </div>

        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">3. What payment methods do you accept?</h2>
          <ul className="privacy-policy-text">
            <li>Credit/Debit Cards (Visa, MasterCard, Amex)</li>
            <li>UPI (Google Pay, PhonePe, etc.)</li>
            <li>Net Banking</li>
            <li>Cash on Delivery (COD) (available for select locations)</li>
          </ul>
        </div>

        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">4. Do you offer international shipping?</h2>
          <p className="privacy-policy-text">
            Currently, Blaze Store only ships within India. We hope to expand our shipping options
            internationally in the near future.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">5. How do I track my order?</h2>
          <p className="privacy-policy-text">
            Once your order is dispatched, you will receive an email or SMS with tracking details.
            You can use this information to track your order through the courier’s website.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">
            6. Can I modify or cancel my order after it’s placed?
          </h2>
          <p className="privacy-policy-text">
            Once an order is confirmed, it is processed for shipment and cannot be modified or
            canceled. Please review your order carefully before confirming. However, if you face
            any issues, you can contact our customer support team within 24 hours, and we will do
            our best to assist you.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">7. How do I know what size to choose?</h2>
          <p className="privacy-policy-text">
            We provide a detailed size guide for each product on our website. Please refer to it
            before placing your order to ensure the best fit. If you're still unsure, feel free to
            reach out to our customer service team for assistance.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">8. Can I return or exchange my items?</h2>
          <p className="privacy-policy-text">
            Yes, we offer a 7-day return/exchange policy. If you are not satisfied with your
            purchase, you can return or exchange the item within 7 days of receiving it, provided it
            is in unused and unwashed condition with the original tags intact. For more details,
            please refer to our Return & Exchange Policy.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">9. How can I contact customer support?</h2>
          <p className="privacy-policy-text">
            You can reach our customer support team via:
          </p>
          <ul className="privacy-policy-text">
            <li>Email: support@blazestore.in</li>
            <li>Phone: +91 123 456 7890</li>
            <li>Live Chat: Available on our website during business hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
