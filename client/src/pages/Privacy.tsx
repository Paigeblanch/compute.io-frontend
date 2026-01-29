import React from 'react';
import './Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 29, 2026</p>
        
        <section>
          <h2>1. Information We Collect</h2>
          <p>When you use Compute.io, we collect:</p>
          <ul>
            <li>API usage data (requests, timestamps, computational results)</li>
            <li>Wallet addresses for payment processing on Base network</li>
            <li>Transaction hashes and payment confirmations</li>
            <li>Email addresses for customer support</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Process API requests and return computational results</li>
            <li>Verify cryptocurrency payments and activate services</li>
            <li>Send API keys and service notifications</li>
            <li>Monitor usage and prevent abuse</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data. All API communications use HTTPS encryption.</p>
        </section>

        <section>
          <h2>4. Third-Party Services</h2>
          <p>We use Base blockchain for payment processing. Transaction data is publicly visible on the blockchain.</p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to request deletion of your data by contacting computeio.payments@gmail.com</p>
        </section>

        <section>
          <h2>6. Contact</h2>
          <p>Questions? Email us at computeio.payments@gmail.com</p>
        </section>
      </div>
    </div>
  );
}
