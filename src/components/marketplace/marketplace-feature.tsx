'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { AppHero } from '../ui/ui-layout'
import { useTokenBalance } from '../token/token-data-access'
import { WalletButton } from '../solana/solana-provider'

const doulaServices = [
  {
    id: 1,
    title: "Pregnancy Support Package",
    description: "24/7 access to AI doula support throughout your pregnancy",
    requiredTokens: 100000,
    duration: "9 months",
    features: ["Unlimited chat", "Weekly check-ins", "Custom birth plan"]
  },
  {
    id: 2,
    title: "Labor & Delivery Preparation",
    description: "Comprehensive guidance for birth preparation",
    requiredTokens: 250000,
    duration: "3 months",
    features: ["Birth positions", "Breathing techniques", "Partner support guide"]
  },
  {
    id: 3,
    title: "Postpartum Care",
    description: "Support for the fourth trimester",
    requiredTokens: 500000,
    duration: "3 months",
    features: ["Recovery tips", "Newborn care", "Emotional support", "Premium content"]
  }
]

export default function MarketplaceFeature() {
  const { publicKey } = useWallet()
  const { tokenBalance, isLoading } = useTokenBalance()

  if (!publicKey) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">AI Digital Doula</h1>
            <p className="py-6">Connect your wallet to access the platform</p>
            <WalletButton className="btn btn-primary" />
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AppHero 
        title="AI Digital Doula Services" 
        subtitle={`Your BAIBAI Balance: ${tokenBalance?.toLocaleString() || 0} tokens`}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
        {doulaServices.map((service) => {
          const isUnlocked = tokenBalance >= service.requiredTokens
          return (
            <div key={service.id} className={`card bg-base-100 shadow-xl ${isUnlocked ? 'border-success' : 'border-error'}`}>
              <div className="card-body">
                <h2 className="card-title">{service.title}</h2>
                <p>{service.description}</p>
                <div className="divider"></div>
                <ul className="list-disc list-inside space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">{service.requiredTokens.toLocaleString()} BAIBAI</span>
                  <span className="text-sm opacity-70">{service.duration}</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  {isUnlocked ? (
                    <button className="btn btn-primary">Access Now</button>
                  ) : (
                    <a href="/how-it-works" className="btn btn-outline">Get More BAIBAI</a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 