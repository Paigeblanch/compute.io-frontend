import React, { useState } from 'react';
import './Pricing.css';

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState<'free' | 'starter' | 'pro' | 'enterprise'>('starter');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    // Check if wallet extension exists
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        // Check if on Base network (Chain ID: 8453)
        const chainId = await window.ethereum.request({ 
          method: 'eth_chainId' 
        });
        
        if (chainId !== '0x2105') { // 8453 in hex
          // Request to switch to Base network
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x2105' }],
            });
          } catch (switchError: any) {
            // If Base not added, add it
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x2105',
                  chainName: 'Base',
                  nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18
                  },
                  rpcUrls: ['https://mainnet.base.org'],
                  blockExplorerUrls: ['https://basescan.org']
                }],
              });
            }
          }
        }
        
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Please try again.');
      }
    } else {
      alert('Please install MetaMask or Coinbase Wallet to continue.');
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  const handlePurchase = async (tier: string, priceUSDC: number) => {
    if (!walletConnected) {
      await connectWallet();
      return;
    }

    // In production, you'd:
    // 1. Create a payment request on your backend
    // 2. Get the payment address and exact USDC amount
    // 3. Initiate the transaction
    // 4. Monitor the blockchain for confirmation
    // 5. Activate the API key once payment is confirmed

    alert(`Payment flow for ${tier} tier ($${priceUSDC} USDC) would be initiated here. This connects to your smart contract or payment processor.`);
    
    // Example transaction (you'll replace this with your actual payment logic)
    /*
    try {
      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: 'YOUR_PAYMENT_CONTRACT_ADDRESS', // Your Base contract or wallet
          value: '0x0', // For USDC, value is 0 (we're calling the USDC contract)
          data: 'ENCODED_USDC_TRANSFER_DATA', // Encoded USDC.transfer() call
        }],
      });
      
      console.log('Transaction hash:', tx);
      // Monitor transaction and activate API key on confirmation
    } catch (error) {
      console.error('Transaction failed:', error);
    }
    */
  };

  return (
    <div className="pricing-container">
      <div className="pricing-hero">
        <h1>Simple, Transparent Pricing</h1>
        <p>Pay with crypto on Base. No hidden fees, no subscriptions.</p>
        
        {!walletConnected ? (
          <button className="wallet-connect-btn" onClick={connectWallet}>
            <span className="wallet-icon">🔗</span>
            Connect Wallet
          </button>
        ) : (
          <div className="wallet-connected">
            <span className="wallet-icon">✓</span>
            <span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          </div>
        )}
      </div>

      <div className="pricing-grid">
        {/* Free Tier */}
        <div className={`pricing-card ${selectedTier === 'free' ? 'selected' : ''}`} 
             onClick={() => setSelectedTier('free')}>
          <div className="pricing-card-header">
            <h3>Free</h3>
            <div className="price">
              <span className="amount">$0</span>
              <span className="period">/month</span>
            </div>
          </div>
          
          <ul className="features-list">
            <li>✓ 1,000 requests/month</li>
            <li>✓ Basic math operations</li>
            <li>✓ Trigonometry functions</li>
            <li>✓ Standard constants (π, e)</li>
            <li>✓ Community support</li>
            <li>✓ 100 requests/hour rate limit</li>
          </ul>

          <button className="pricing-btn secondary">
            Get Started Free
          </button>

          <div className="pricing-note">
            Perfect for testing and small projects
          </div>
        </div>

        {/* Starter Tier */}
        <div className={`pricing-card popular ${selectedTier === 'starter' ? 'selected' : ''}`} 
             onClick={() => setSelectedTier('starter')}>
          <div className="popular-badge">Most Popular</div>
          <div className="pricing-card-header">
            <h3>Starter</h3>
            <div className="price">
              <span className="amount">$29</span>
              <span className="period">/month</span>
            </div>
            <div className="crypto-price">~29 USDC on Base</div>
          </div>
          
          <ul className="features-list">
            <li>✓ 50,000 requests/month</li>
            <li>✓ All Free features</li>
            <li>✓ Calculus (derivatives, integrals)</li>
            <li>✓ Linear algebra operations</li>
            <li>✓ Basic physics simulations</li>
            <li>✓ Email support</li>
            <li>✓ 1,000 requests/hour rate limit</li>
            <li>✓ 99.9% uptime SLA</li>
          </ul>

          <button 
            className="pricing-btn primary"
            onClick={() => handlePurchase('Starter', 29)}
          >
            {walletConnected ? 'Pay 29 USDC' : 'Connect & Pay'}
          </button>

          <div className="pricing-note">
            Great for production AI agents
          </div>
        </div>

        {/* Pro Tier */}
        <div className={`pricing-card ${selectedTier === 'pro' ? 'selected' : ''}`} 
             onClick={() => setSelectedTier('pro')}>
          <div className="pricing-card-header">
            <h3>Pro</h3>
            <div className="price">
              <span className="amount">$99</span>
              <span className="period">/month</span>
            </div>
            <div className="crypto-price">~99 USDC on Base</div>
          </div>
          
          <ul className="features-list">
            <li>✓ 250,000 requests/month</li>
            <li>✓ All Starter features</li>
            <li>✓ Advanced physics simulations</li>
            <li>✓ Differential equations</li>
            <li>✓ Statistical analysis</li>
            <li>✓ Optimization algorithms</li>
            <li>✓ Priority support (24h response)</li>
            <li>✓ 10,000 requests/hour rate limit</li>
            <li>✓ 99.95% uptime SLA</li>
            <li>✓ Custom spending limits</li>
          </ul>

          <button 
            className="pricing-btn primary"
            onClick={() => handlePurchase('Pro', 99)}
          >
            {walletConnected ? 'Pay 99 USDC' : 'Connect & Pay'}
          </button>

          <div className="pricing-note">
            For high-volume applications
          </div>
        </div>

        {/* Enterprise Tier */}
        <div className={`pricing-card ${selectedTier === 'enterprise' ? 'selected' : ''}`} 
             onClick={() => setSelectedTier('enterprise')}>
          <div className="pricing-card-header">
            <h3>Enterprise</h3>
            <div className="price">
              <span className="amount">Custom</span>
            </div>
            <div className="crypto-price">Flexible payment terms</div>
          </div>
          
          <ul className="features-list">
            <li>✓ Unlimited requests</li>
            <li>✓ All Pro features</li>
            <li>✓ Dedicated infrastructure</li>
            <li>✓ Custom integrations</li>
            <li>✓ White-label options</li>
            <li>✓ SLA guarantees</li>
            <li>✓ Priority 24/7 support</li>
            <li>✓ No rate limits</li>
            <li>✓ Volume discounts</li>
            <li>✓ Custom contract terms</li>
          </ul>

          <button className="pricing-btn secondary">
            Contact Sales
          </button>

          <div className="pricing-note">
            For large organizations
          </div>
        </div>
      </div>

      {/* Pay-as-you-go option */}
      <div className="payg-section">
        <h2>Or Pay As You Go</h2>
        <p>No commitment. Pay only for what you use.</p>
        
        <div className="payg-pricing">
          <div className="payg-item">
            <span className="payg-label">Simple calculations</span>
            <span className="payg-price">$0.001 per request</span>
          </div>
          <div className="payg-item">
            <span className="payg-label">Complex calculations</span>
            <span className="payg-price">$0.005 per request</span>
          </div>
          <div className="payg-item">
            <span className="payg-label">Simulations</span>
            <span className="payg-price">$0.01 per run</span>
          </div>
        </div>

        <button className="pricing-btn secondary">
          Start with Pay-as-you-go
        </button>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-grid">
          <div className="faq-item">
            <h3>What cryptocurrencies do you accept?</h3>
            <p>We accept USDC and ETH on the Base network. Base offers fast transactions with low fees (~$0.01).</p>
          </div>

          <div className="faq-item">
            <h3>How do I connect my wallet?</h3>
            <p>Click "Connect Wallet" and we'll guide you through connecting MetaMask or Coinbase Wallet. If you're not on Base network, we'll help you switch.</p>
          </div>

          <div className="faq-item">
            <h3>What happens after payment?</h3>
            <p>Once your transaction is confirmed on-chain (usually 2-3 seconds), your API key is automatically activated and usage credits are added to your account.</p>
          </div>

          <div className="faq-item">
            <h3>Can I get a refund?</h3>
            <p>Due to the nature of blockchain transactions, all payments are final. However, unused credits never expire and can be used anytime.</p>
          </div>

          <div className="faq-item">
            <h3>What if I exceed my limit?</h3>
            <p>Requests will be rate-limited. You can purchase additional credits anytime or upgrade to a higher tier.</p>
          </div>

          <div className="faq-item">
            <h3>Do you offer volume discounts?</h3>
            <p>Yes! Enterprise customers get custom pricing. Contact sales@compute.io for a quote.</p>
          </div>
        </div>
      </div>

      {/* Supported Networks */}
      <div className="network-info">
        <h3>🔷 Powered by Base</h3>
        <p>Fast, secure, low-cost transactions on Ethereum L2</p>
        <div className="network-features">
          <span>⚡ 2-second confirmations</span>
          <span>💰 ~$0.01 transaction fees</span>
          <span>🔒 Ethereum security</span>
        </div>
      </div>
    </div>
  );
}

// TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
