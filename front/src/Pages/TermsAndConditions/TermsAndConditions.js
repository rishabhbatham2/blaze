import React, { useEffect } from "react";



export default function TermsAndCondition(){


 useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll animation
          });
    },[])

    return(
     <div className="maincont">
              <div class="privacy-policy-container">
    <div class="privacy-policy-header">
        <h1 class="privacy-policy-title">Terms and Conditions</h1>
        <p class="privacy-policy-subtitle">Welcome to Blaze! These terms and conditions outline the rules and regulations for using our website, blazestore.in, and purchasing products from us. By accessing or using our website, you agree to comply with the following terms:</p>
    </div>

    <div class="privacy-policy-section">
        <h2 class="privacy-policy-section-title" style={{marginTop:'1rem'}}>1. General Information</h2>
        <p class="privacy-policy-text">1.1. Blaze specializes in selling men’s and women’s clothing, including but not limited to hoodies, t-shirts, and track pants.</p>
        <p class="privacy-policy-text">1.2. All products displayed on the website are subject to availability.</p>
        <p class="privacy-policy-text">1.3. Blaze reserves the right to modify or update these terms at any time without prior notice. Continued use of the website signifies acceptance of the updated terms.</p>
    </div>

    <div class="privacy-policy-section">
        <h2 class="privacy-policy-section-title">2. Product Information</h2>
        <p class="privacy-policy-text">2.1. We strive to provide accurate descriptions and images of our products. However, there may be slight variations in color or design due to screen settings or production differences.</p>
        <p class="privacy-policy-text">2.2. Sizing information is provided to assist customers; we recommend referring to the size chart before making a purchase.</p>
    </div>

    <div class="privacy-policy-section">
        <h2 class="privacy-policy-section-title">3. Pricing and Payment</h2>
        <p class="privacy-policy-text">3.1. All prices listed on blazestore.in are in INR and inclusive of applicable taxes unless stated otherwise.</p>
        <p class="privacy-policy-text">3.2. Payment methods accepted include credit cards, debit cards, UPI, and other online payment options as mentioned at checkout.</p>
        <p class="privacy-policy-text">3.3. Blaze reserves the right to change product prices at any time without prior notice.</p>
    </div>

    <div class="privacy-policy-section">
        <h2 class="privacy-policy-section-title">4. Shipping and Delivery</h2>
        <p class="privacy-policy-text">4.1. Orders will be processed and shipped within 2-5 business days after payment confirmation.</p>
        <p class="privacy-policy-text">4.2. Delivery timelines depend on the shipping address and courier service availability.</p>
        <p class="privacy-policy-text">4.3. Customers are responsible for providing accurate delivery information. Blaze is not liable for delays or lost packages due to incorrect address details.</p>
    </div>

    <div class="privacy-policy-section">
        <h2 class="privacy-policy-section-title">5. Returns and Refunds</h2>
        <p class="privacy-policy-text">5.1. Returns are accepted within 7 days of product delivery, provided the item is unused, unwashed, and in its original condition with tags intact.</p>
        <p class="privacy-policy-text">5.2. Refunds will be processed within 7-10 business days after the returned product is inspected and approved.</p>
        <p class="privacy-policy-text">5.3. Products purchased during sale events or promotions are non-refundable unless they are defective or incorrect.</p>
        <p class="privacy-policy-text">5.4. Shipping fees for returns are non-refundable unless the return is due to a mistake on our part (e.g., wrong or defective item delivered).</p>
    </div>

    <div class="privacy-policy-section">
        <h2 class="privacy-policy-section-title">6. Intellectual Property</h2>
        <p class="privacy-policy-text">6.1. All content on blazestore.in, including text, images, logos, and designs, is the property of Blaze and protected under intellectual property laws.</p>
        <p class="privacy-policy-text">6.2. Unauthorized use, reproduction, or distribution of our content is strictly prohibited.</p>
    </div>

    <div class="privacy-policy-section">
        <h2 class="privacy-policy-section-title">7. Limitation of Liability</h2>
        <p class="privacy-policy-text">7.1. Blaze is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
        <p class="privacy-policy-text">7.2. Our liability is limited to the purchase price of the item(s) in question.</p>
    </div>

    <div class="privacy-policy-section">
        <h2 class="privacy-policy-section-title">8. Privacy Policy</h2>
        <p class="privacy-policy-text">8.1. Blaze is committed to protecting your personal information. Please review our Privacy Policy for details on how we collect, use, and store your data.</p>
    </div>

    <div class="privacy-policy-section">
        <h2 class="privacy-policy-section-title">9. Governing Law</h2>
        <p class="privacy-policy-text">9.1. These terms are governed by the laws of India. Any disputes arising from the use of our website or services will be subject to the jurisdiction of New Delhi in India.</p>
    </div>

    <div class="privacy-policy-section">
        <h2 class="privacy-policy-section-title">10. Contact Information</h2>
        <p class="privacy-policy-text">For questions or concerns regarding these terms and conditions, please contact us:</p>
        <p class="privacy-policy-contact">Email: support@blazestore.in</p>
        <p class="privacy-policy-contact">Phone: +91-9818793773</p>
        <p class="privacy-policy-contact">Website: www.blazestore.in</p>
    </div>
</div> </div>

    )
}