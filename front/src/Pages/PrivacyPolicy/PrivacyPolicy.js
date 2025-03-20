import React, { useEffect } from 'react';
import './PrivacyPolicy.css'; // Import the CSS file

const PrivacyPolicy = () => {

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll animation
          });
    },[])
  return (
   <div className='maincont'>
        <div className="privacy-policy-container">
      <h1 className="privacy-policy-title" >Privacy Policy</h1>
      <p>
        At Blaze, accessible from <a href="https://blazestore.in" className="privacy-policy-link">blazestore.in</a>, your privacy is one of our top priorities. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or make purchases.
      </p>
      
      <h2 className="privacy-policy-subtitle">1. Information We Collect</h2>
      <h3 className="privacy-policy-subsection">1.1. Personal Information</h3>
      <ul className="privacy-policy-list">
        <li>Name, email address, phone number, and shipping/billing address when you create an account or place an order.</li>
        <li>Payment information such as credit/debit card details (processed securely through third-party payment gateways).</li>
      </ul>
      <h3 className="privacy-policy-subsection">1.2. Non-Personal Information</h3>
      <ul className="privacy-policy-list">
        <li>IP address, browser type, and operating system.</li>
        <li>Information about your interaction with our website, including pages viewed and time spent.</li>
      </ul>

      <h2 className="privacy-policy-subtitle">2. How We Use Your Information</h2>
      <h3 className="privacy-policy-subsection">2.1. Order Processing</h3>
      <ul className="privacy-policy-list">
        <li>To fulfill your orders, manage payments, and arrange shipping.</li>
      </ul>
      <h3 className="privacy-policy-subsection">2.2. Customer Support</h3>
      <ul className="privacy-policy-list">
        <li>To respond to inquiries, resolve issues, and provide after-sales support.</li>
      </ul>
      <h3 className="privacy-policy-subsection">2.3. Marketing</h3>
      <ul className="privacy-policy-list">
        <li>To send promotional emails, offers, and updates (you can opt out anytime).</li>
        <li>To personalize your shopping experience by suggesting products based on your preferences.</li>
      </ul>
      <h3 className="privacy-policy-subsection">2.4. Analytics</h3>
      <ul className="privacy-policy-list">
        <li>To analyze website traffic and improve our services and offerings.</li>
      </ul>

      <h2 className="privacy-policy-subtitle">3. Sharing Your Information</h2>
      <h3 className="privacy-policy-subsection">3.1. Service Providers</h3>
      <ul className="privacy-policy-list">
        <li>Third-party vendors for payment processing, shipping, and website analytics.</li>
      </ul>
      <h3 className="privacy-policy-subsection">3.2. Legal Requirements</h3>
      <ul className="privacy-policy-list">
        <li>If required by law or to protect our legal rights.</li>
      </ul>

      <h2 className="privacy-policy-subtitle">4. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your information from unauthorized access, alteration, or disclosure. However, no online system is entirely secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="privacy-policy-subtitle">5. Cookies and Tracking Technologies</h2>
      <p>
        We use cookies to enhance your browsing experience. Cookies help us:
      </p>
      <ul className="privacy-policy-list">
        <li>Remember your preferences.</li>
        <li>Provide personalized product recommendations.</li>
        <li>Analyze website performance and traffic.</li>
      </ul>
      <p>You can control cookie preferences through your browser settings.</p>

      <h2 className="privacy-policy-subtitle">6. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. Blaze is not responsible for the privacy practices or content of these external sites. Please review their privacy policies separately.
      </p>

      <h2 className="privacy-policy-subtitle">7. Your Rights</h2>
      <ul className="privacy-policy-list">
        <li>Access and Update: View and update your personal information through your account.</li>
        <li>Delete: Request the deletion of your personal data (subject to legal or operational requirements).</li>
        <li>Opt-Out: Unsubscribe from marketing communications by clicking the "unsubscribe" link in emails or contacting us.</li>
      </ul>

      <h2 className="privacy-policy-subtitle">8. Children’s Privacy</h2>
      <p>
        Blaze does not knowingly collect personal information from children under 13. If we discover that such information has been provided, we will delete it promptly. Customers should also avoid providing such information or any other confidential information.
      </p>

      <h2 className="privacy-policy-subtitle">9. Changes to This Privacy Policy</h2>
      <p>
        We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page, and the revised date will be updated.
      </p>

      <h2 className="privacy-policy-subtitle">10. Contact Us</h2>
      <p>
        For any questions, concerns, or requests related to this Privacy Policy, please contact us:
      </p>
      <ul className="privacy-policy-list">
        <li>Email: <a href="mailto:support@blazestore.in" className="privacy-policy-link">support@blazestore.in</a></li>
        <li>Phone: +91-9821847815</li>
        <li>Website: <a href="https://www.blazestore.in" className="privacy-policy-link">www.blazestore.in</a></li>
      </ul>
    </div>
   </div>
  );
};

export default PrivacyPolicy;
