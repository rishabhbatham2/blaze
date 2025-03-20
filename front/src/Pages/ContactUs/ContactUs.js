import React, { useEffect } from "react";


const ContactUs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="maincont">
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-title">Contact Us</h1>
        <p>
          We're here to assist you with any questions or information you may need. Whether you need help with the registration process, have queries about the competition rules, or simply want to clarify any details, feel free to get in touch with us.
        </p>

        <h2 className="privacy-policy-subtitle">Connect with Us:</h2>

        <p className="privacy-policy-text">
          For quick and easy communication, you can reach us via WhatsApp at{" "}
          <a href="https://wa.me/9821847815" className="privacy-policy-link" target="_blank" rel="noopener noreferrer">
            9821847815
          </a>. Send us a message, and we'll respond as soon as possible.
        </p>

        <p className="privacy-policy-text">
         If you prefer to speak to us directly, feel free to call us at{" "}
          <a href="tel:6392971413" className="privacy-policy-link">
            6392971413
          </a>. We're available to assist you with any queries.
        </p>

        <h2 className="privacy-policy-subtitle">Our Commitment:</h2>
        <p className="privacy-policy-text">
          Our team is dedicated to ensuring your experience is smooth and enjoyable. Don't hesitate to contact us, and we'll be happy to help you with all the details you need to participate in the competition.
        </p>

        <h2  style={{marginTop:11}}>Our Address</h2>
        <p>Head Office: A-49, Engine House, Mohan Industrial Estate, Mathura Road, New Delhi, India,PIN - 110044 </p>

       
      <ul className="privacy-policy-list" style={{marginTop:'1rem'}}>
        <li>Email: <a href="mailto:support@blazestore.in" className="privacy-policy-link">support@blazestore.in</a></li>
        <li>Phone: +91-9821847814</li>
        <li>Website: <a href="https://www.blazestore.in" className="privacy-policy-link">www.blazestore.in</a></li>
      </ul>
      </div>
    </div>
  );
};

export default ContactUs;
