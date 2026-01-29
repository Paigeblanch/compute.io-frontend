import React from 'react';
import './Terms.css';

export default function Terms() {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <header className="terms-header">
          <h1>Terms of Service</h1>
          <p className="terms-updated">Last Updated: January 29, 2026</p>
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
            <li>Notify us immediately of any unauthorized use of your acc
