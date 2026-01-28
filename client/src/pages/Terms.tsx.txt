import React from 'react';
import './Terms.css';

export default function Terms() {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <header className="terms-header">
          <h1>Terms of Service</h1>
          <p className="terms-updated">Last Updated: January 27, 2025</p>
        </header>

        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Compute.io's API services ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our Service.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Description of Service</h2>
          <p>
            Compute.io provides a serverless API for mathematical and physics computations. The Service is designed for AI agents and autonomous systems that require reliable, deterministic computational outputs.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. API Usage and Restrictions</h2>
          <h3>Acceptable Use</h3>
          <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Attempt to reverse engineer, decompile, or discover the source code of the Service</li>
            <li>Use the Service to process illegal content or violate any applicable laws</li>
            <li>Attempt to circumvent rate limits or usage restrictions</li>
            <li>Resell or redistribute the Service without explicit written permission</li>
            <li>Use the Service in any manner that could damage, disable, or impair our servers</li>
          </ul>

          <h3>Rate Limits</h3>
          <p>
            Your usage is subject to rate limits based on your subscription tier. Exceeding these limits may result in temporary service suspension or additional charges.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Payment Terms</h2>
          <h3>Cryptocurrency Payments</h3>
          <p>
            Compute.io accepts payment via cryptocurrency on the Base network (USDC, ETH). All payments are final and non-refundable once processed on-chain.
          </p>

          <h3>Billing</h3>
          <p>
            You agree to pay all fees associated with your use of the Service. Fees are calculated based on your API usage and selected pricing tier. You are responsible for monitoring your usage and associated costs.
          </p>

          <h3>Refund Policy</h3>
          <p>
            Due to the nature of cryptocurrency transactions and automated API usage, all payments are final. In exceptional circumstances, refunds may be issued at our sole discretion.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Account Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your API keys and account credentials. You agree to:
          </p>
          <ul>
            <li>Keep your API keys secure and not share them with unauthorized parties</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Accept responsibility for all activities that occur under your account</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>6. Service Availability</h2>
          <h3>Uptime Commitment</h3>
          <p>
            We strive to maintain 99.9% uptime but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.
          </p>

          <h3>Service Modifications</h3>
          <p>
            We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with reasonable notice to users.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Intellectual Property</h2>
          <p>
            The Service, including all content, features, and functionality, is owned by Compute.io and is protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h3>Your Content</h3>
          <p>
            You retain ownership of any data you submit to the Service. By using the Service, you grant us a limited license to process your requests and return computational results.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Limitation of Liability</h2>
          <p>
            <strong>IMPORTANT:</strong> To the maximum extent permitted by law, Compute.io shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
          </p>
          <ul>
            <li>Your use or inability to use the Service</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
            <li>Any computational errors or inaccuracies in results provided by the Service</li>
            <li>Any bugs, viruses, or other harmful code that may be transmitted to or through the Service</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>9. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that:
          </p>
          <ul>
            <li>The Service will be uninterrupted, secure, or error-free</li>
            <li>Computational results will be 100% accurate for all use cases</li>
            <li>Any errors in the Service will be corrected</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Compute.io, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or related to your use of the Service or violation of these Terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>11. Privacy</h2>
          <p>
            Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your information.
          </p>
        </section>

        <section className="terms-section">
          <h2>12. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, with or without notice. Upon termination:
          </p>
          <ul>
            <li>Your right to use the Service will immediately cease</li>
            <li>You must cease all use of the Service and destroy any API keys</li>
            <li>Any outstanding fees will become immediately due and payable</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of [YOUR JURISDICTION], without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="terms-section">
          <h2>14. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Service. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>15. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="contact-info">
            <strong>Email:</strong> [YOUR_EMAIL]<br />
            <strong>Support:</strong> support@compute.io<br />
            <strong>Legal:</strong> legal@compute.io
          </p>
        </section>

        <footer className="terms-footer">
          <p>
            By using Compute.io, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </footer>
      </div>
    </div>
  );
}
