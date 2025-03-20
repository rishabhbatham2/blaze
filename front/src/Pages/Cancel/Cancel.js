import React, { useEffect } from "react";
import './Cancel.css'




export default function Cancel(){
 useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll animation
          });
    },[])

    return(
      <div className="maincont">
    


  
    <div className="policy-container privacy-policy-container">
    
        <h1 class="privacy-policy-title">Refund and Cancellation</h1>

   
      <p className="policy-intro">
        At Blaze, accessible from blazestore.in, we aim to provide our customers with the best shopping
        experience. If you are not completely satisfied with your purchase, our refund and cancellation
        policy ensures transparency and fairness. Please read the details below:
      </p>

      <section className="policy-section">
        <h2 className="policy-subheading">1. Cancellation Policy</h2>

        <div className="policy-subsection">
          <h3 className="policy-subsubheading">1.1. Order Cancellation by Customer</h3>
          <ul className="policy-list">
            <li className="policy-list-item">
              Orders can be canceled before they are shipped. To cancel your order, please contact
              our support team at <a href="mailto:support@blazestore.in" className="policy-link">support@blazestore.in</a> or call us at +91-9821847815.
            </li>
            <li className="policy-list-item">
              If the cancellation request is approved, a full refund will be initiated to your original
              payment method.
            </li>
            <li className="policy-list-item">
              Once an order is shipped, it cannot be canceled. You may initiate a return after receiving
              the product.
            </li>
          </ul>
        </div>

        <div className="policy-subsection">
          <h3 className="policy-subsubheading">1.2. Order Cancellation by Blaze</h3>
          <ul className="policy-list">
            <li className="policy-list-item">
              Blaze reserves the right to cancel orders under certain conditions, such as stock
              unavailability, payment issues, or incorrect pricing due to technical errors.
            </li>
            <li className="policy-list-item">
              In such cases, the customer will be notified, and a full refund will be processed.
            </li>
          </ul>
        </div>
      </section>

      <section className="policy-section">
        <h2 className="policy-subheading">2. Refund Policy</h2>

        <div className="policy-subsection">
          <h3 className="policy-subsubheading">2.1. Eligibility for Refunds</h3>
          <ul className="policy-list">
            <li className="policy-list-item">
              Refunds are applicable for products that are:
              <ul className="policy-inner-list">
                <li className="policy-list-item">Received in a defective or damaged condition.</li>
                <li className="policy-list-item">Incorrect (wrong size, color, or product delivered).</li>
                <li className="policy-list-item">
                  Returned within 7 days of delivery in unused, unwashed condition with original
                  tags and packaging.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="policy-subsection">
          <h3 className="policy-subsubheading">2.2. Non-Refundable Items</h3>
          <ul className="policy-list">
            <li className="policy-list-item">
              Products purchased during sale events or promotions are non-refundable unless they
              are defective or incorrect.
            </li>
          
          </ul>
        </div>

        <div className="policy-subsection">
          <h3 className="policy-subsubheading">2.3. Refund Process</h3>
          <ul className="policy-list">
            <li className="policy-list-item">
            Once the returned product is inspected & approved the refund will be credited to the original payment method within 7 to 10 days of receiving the product.
            </li>
            <li className="policy-list-item">
              Refunds will be credited to the original payment method. If the payment was made via
              COD (Cash on Delivery), the refund will be issued as store credit or via bank transfer
              (customer details required).
            </li>
            <li className="policy-list-item">
              Shipping fees are non-refundable unless the return is due to our error.
            </li>
          </ul>
        </div>
      </section>

      <section className="policy-section">
        <h2 className="policy-subheading">3. Return Process</h2>

        <div className="policy-subsection">
          <h3 className="policy-subsubheading">3.1. Steps to Initiate a Return</h3>
          <ol className="policy-ordered-list">
            <li className="policy-list-item">
              Contact our support team at <a href="mailto:support@blazestore.in" className="policy-link">support@blazestore.in</a> or call us at +91-9821847814
              within 7 days of receiving the product.
            </li>
            <li className="policy-list-item">Provide your order details and reason for the return.</li>
            <li className="policy-list-item">
              Pack the item securely in its original packaging and ship it to the return address provided
              by our team.
            </li>
          </ol>
        </div>

        <div className="policy-subsection">
          <h3 className="policy-subsubheading">3.2. Return Shipping Charges</h3>
          <ul className="policy-list">
            <li className="policy-list-item">
              If the return is due to a mistake on our part (e.g., defective or wrong product), Blaze will
              cover the return shipping charges.
            </li>
            <li className="policy-list-item">
              For other reasons, customers are responsible for return shipping costs.
            </li>
          </ul>
        </div>
      </section>
      <section className="policy-section">
        <h2 className="policy-subheading">4. Shipping Policy</h2>
        <ul className="policy-list">
          <li className="policy-list-item">
          The product will be delivered within 4-6 days.
          </li>
         {/*  <li className="policy-list-item">
            Follow the return process to send the original product back, and a replacement will be
            shipped once approved.
          </li> */}
        </ul>
      </section>

      <section className="policy-section">
        <h2 className="policy-subheading">5. Exchange Policy</h2>
        <ul className="policy-list">
          <li className="policy-list-item">
            Exchanges are subject to product availability and can be initiated for size or color
            changes.
          </li>
          <li className="policy-list-item">
         Follow the return process to send the original product back, and a replacement will be shipped once approved. Exchange and replacement will be done within 7 days
          </li>
        </ul>
      </section>

      <section className="policy-section">
        <h2 className="policy-subheading">6. Important Notes</h2>
        <ul className="policy-list">
          <li className="policy-list-item">
            Ensure all returns and exchanges meet the eligibility criteria to avoid delays.
          </li>
          <li className="policy-list-item">
            Blaze reserves the right to reject returns that do not comply with our policies.
          </li>
        </ul>
      </section>

      <section className="policy-section">
        <h2 className="policy-subheading">7. Contact Us</h2>
        <ul className="policy-list">
          <li className="policy-list-item">
            Email: <a href="mailto:support@blazestore.in" className="policy-link">support@blazestore.in</a>
          </li>
          <li className="policy-list-item">Phone: +91-9821847815</li>
          <li className="policy-list-item">Website: <a href="https://www.blazestore.in" className="policy-link">www.blazestore.in</a></li>
        </ul>
      </section>
    </div>




      </div>
    )
}




