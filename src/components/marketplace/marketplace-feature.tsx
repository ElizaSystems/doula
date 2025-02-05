'use client'

import { AppHero } from '../ui/ui-layout'

const doulaServices = [
  {
    id: 1,
    title: "Pregnancy Support Package",
    description: "24/7 access to AI doula support throughout your pregnancy",
    price: 1, // In SOL
    duration: "9 months"
  },
  {
    id: 2,
    title: "Labor & Delivery Preparation",
    description: "Comprehensive guidance for birth preparation",
    price: 0.5,
    duration: "3 months"
  },
  {
    id: 3,
    title: "Postpartum Care",
    description: "Support for the fourth trimester",
    price: 0.7,
    duration: "3 months"
  }
]

export default function MarketplaceFeature() {
  return (
    <div>
      <AppHero 
        title="AI Doula Services" 
        subtitle="Choose the support package that's right for you"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
        {doulaServices.map((service) => (
          <div key={service.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{service.title}</h2>
              <p>{service.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">{service.price} SOL</span>
                <span className="text-sm opacity-70">{service.duration}</span>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary">Purchase</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 