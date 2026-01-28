import React from 'react';
import './Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <header className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="privacy-updated">Last Updated: January 27, 2025</p>
        </header>

        <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            Compute.io ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our API services.
          </p>
          <p>
            By using Compute.io, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          
          <h3>Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul>
            <li>Email address</li>
            <li>Wallet address (for cryptocurrency payments)</li>
            <li>Account creation date and time</li>
          </ul>

          <h3>API Usage Data</h3>
          <p>When you use our API, we automatically collect:</p>
          <ul>
            <li>API requests (expressions, equations, simulations)</li>
            <li>Request timestamps and response times</li>
            <li>API key used for authentication</li>
            <li>Rate limit and usage metrics</li>
            <li>Error logs and debugging information</li>
          </ul>

          <h3>Technical Information</h3>
          <p>We automatically collect certain technical information:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Operating system</li>
            <li>Referring URLs</li>
          </ul>

          <h3>Payment Information</h3>
          <p>For cryptocurrency payments on Base network:</p>
          <ul>
            <li>Wallet addresses (public blockchain data)</li>
            <li>Transaction hashes</li>
            <li>Payment amounts and timestamps</li>
          </ul>
          <p className="note">
            Note: We do not store private keys or seed phrases. All payments are processed on-chain.
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          
          <h3>Service Delivery</h3>
          <ul>
            <li>Processing your API requests</li>
            <li>Authenticating your account</li>
            <li>Calculating usage and billing</li>
            <li>Enforcing rate limits</li>
          </ul>

          <h3>Service Improvement</h3>
          <ul>
            <li>Analyzing usage patterns to improve performance</li>
            <li>Debugging and fixing errors</li>
            <li>Developing new features</li>
            <li>Optimizing computational efficiency</li>
          </ul>

          <h3>Communication</h3>
          <ul>
            <li>Sending service-related notifications</li>
            <li>Providing customer support</li>
            <li>Sending important updates about our service</li>
            <li>Responding to your inquiries</li>
          </ul>

          <h3>Security and Fraud Prevention</h3>
          <ul>
            <li>Detecting and preventing abuse</li>
            <li>Monitoring for suspicious activity</li>
            <li>Protecting against unauthorized access</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>4. Data Retention</h2>
          <p>We retain your information for as long as necessary to:</p>
          <ul>
            <li>Provide our services to you</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce our agreements</li>
          </ul>
          <p>
            API request logs are typically retained for 90 days. Account information is retained until account deletion. Blockchain transaction data is permanently recorded on the Base network and cannot be deleted.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share your information in the following circumstances:</p>

          <h3>Service Providers</h3>
          <p>We may share data with third-party service providers who help us operate our service:</p>
          <ul>
            <li>Cloud hosting providers (for server infrastructure)</li>
            <li>Analytics services (for usage monitoring)</li>
            <li>Email service providers (for notifications)</li>
          </ul>

          <h3>Legal Requirements</h3>
          <p>We may disclose your information if required to do so by law or in response to:</p>
          <ul>
            <li>Valid legal requests from authorities</li>
            <li>Court orders or subpoenas</li>
            <li>Protection of our legal rights</li>
            <li>Prevention of fraud or illegal activity</li>
          </ul>

          <h3>Business Transfers</h3>
          <p>
            In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your data:</p>
          <ul>
            <li>Encryption of data in transit (HTTPS/TLS)</li>
            <li>Encryption of sensitive data at rest</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication</li>
            <li>Monitoring for security threats</li>
          </ul>
          <p className="warning">
            <strong>Important:</strong> No method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Your Rights and Choices</h2>
          <p>Depending on your location, you may have the following rights:</p>

          <h3>Access and Portability</h3>
          <ul>
            <li>Request access to your personal data</li>
            <li>Receive a copy of your data in a portable format</li>
          </ul>

          <h3>Correction and Deletion</h3>
          <ul>
            <li>Correct inaccurate personal data</li>
            <li>Request deletion of your account and data</li>
          </ul>

          <h3>Opt-Out</h3>
          <ul>
            <li>Unsubscribe from marketing emails</li>
            <li>Opt out of non-essential data collection</li>
          </ul>

          <p>To exercise these rights, contact us at paigeblanch09@gmail.com</p>
        </section>

        <section className="privacy-section">
          <h2>8. Cookies and Tracking</h2>
          <p>We use cookies and similar tracking technologies for:</p>
          <ul>
            <li>Authentication and session management</li>
            <li>Analytics and performance monitoring</li>
            <li>Remembering your preferences</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of our service.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws different from those in your country.
          </p>
          <p>
            We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Children's Privacy</h2>
          <p>
            Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will take steps to delete that information.
          </p>
        </section>

        <section className="privacy-section">
          <h2>11. Third-Party Links</h2>
          <p>
            Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section className="privacy-section">
          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes by:
          </p>
          <ul>
            <li>Posting the updated policy on our website</li>
            <li>Sending an email notification</li>
            <li>Displaying a prominent notice in our dashboard</li>
          </ul>
          <p>
            Your continued use of the service after changes constitutes acceptance of the updated Privacy Policy.
          </p>
        </section>

        <section className="privacy-section">
          <h2>13. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
          <div className="contact-info">
            <p><strong>Email:</strong> paigeblanch09@gmail.com</p>
            <p><strong>Support:</strong> paigeblanch09@gmail.com</p>
            <p><strong>Address:</strong> California, United States</p>
          </div>
        </section>

        <section className="privacy-section gdpr-section">
          <h2>14. GDPR Compliance (EU Users)</h2>
          <p>If you are located in the European Economic Area (EEA), you have additional rights under GDPR:</p>
          <ul>
            <li>Right to be informed about data collection</li>
            <li>Right of access to your data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Rights related to automated decision-making</li>
          </ul>
          <p>
            Our lawful basis for processing your data includes: contract performance, legal obligations, and legitimate interests.
          </p>
        </section>

        <section className="privacy-section ccpa-section">
          <h2>15. CCPA Rights (California Users)</h2>
          <p>If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):</p>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to know if personal information is sold or disclosed</li>
            <li>Right to say no to the sale of personal information</li>
            <li>Right to access your personal information</li>
            <li>Right to equal service and price</li>
          </ul>
          <p><strong>Note:</strong> We do not sell your personal information.</p>
        </section>

        <footer className="privacy-footer">
          <p>
            By using Compute.io, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </footer>
      </div>
    </div>
  );
}
