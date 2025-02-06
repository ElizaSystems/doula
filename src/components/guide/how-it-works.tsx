'use client'

import { IconWallet, IconCoin, IconArrowRight, IconMessage, IconMap } from '@tabler/icons-react'

const steps = [
  {
    title: "Install Phantom Wallet",
    icon: <IconWallet size={24} />,
    description: "Download and install Phantom Wallet from the Chrome Web Store or App Store. Create a new wallet and securely store your recovery phrase.",
    link: "https://phantom.app",
    buttonText: "Get Phantom"
  },
  {
    title: "Buy Solana (SOL)",
    icon: <IconCoin size={24} />,
    description: "Purchase SOL from an exchange like Coinbase or Binance. Send it to your Phantom Wallet address.",
    link: "https://www.coinbase.com/price/solana",
    buttonText: "Buy SOL"
  },
  {
    title: "Swap for $BAIBAI", 
    icon: <IconMap size={24} />,
    description: "Use Jupiter Exchange to swap your SOL for $BAIBAI tokens. You need 100,000 $BAIBAI to use the Digital Doula.",
    link: "https://jup.ag",
    buttonText: "Swap Tokens"
  },
  {
    title: "Start Using Digital Doula",
    icon: <IconMessage size={24} />,
    description: "With 100,000 $BAIBAI in your wallet, you can now access all Digital Doula features and services.",
    link: "/dashboard",
    buttonText: "Go to Dashboard"
  }
]

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How It Works</h1>
        <p className="text-xl opacity-70">Follow these steps to start using the Digital Doula</p>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h2 className="card-title mb-2">
                    Step {index + 1}: {step.title}
                  </h2>
                  <p className="opacity-70 mb-4">{step.description}</p>
                  <div className="card-actions">
                    <a 
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      {step.buttonText}
                      <IconArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info mt-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="font-bold">Important Note</h3>
          <div className="text-sm">
            You must maintain a balance of at least 100,000 $BAIBAI tokens in your wallet to access Digital Doula services. 
            Make sure to keep enough SOL in your wallet for transaction fees.
          </div>
        </div>
      </div>
    </div>
  )
} 