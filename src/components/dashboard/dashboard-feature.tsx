'use client'

import { AppHero } from '../ui/ui-layout'

const resources = [
  { label: 'Pregnancy Week by Week', href: '/resources/pregnancy-timeline' },
  { label: 'Birth Plan Templates', href: '/resources/birth-plans' },
  { label: 'Nutrition Guidelines', href: '/resources/nutrition' },
  { label: 'Common Pregnancy Symptoms', href: '/resources/symptoms' },
  { label: 'Labor Positions Guide', href: '/resources/labor-positions' },
]

export default function DashboardFeature() {
  return (
    <div>
      <AppHero 
        title="Welcome to AI Digital Doula" 
        subtitle="Your trusted companion through pregnancy and parenthood." 
      />
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Helpful Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((link, index) => (
              <div key={index} className="card bg-base-100 shadow-hover">
                <div className="card-body">
                  <a href={link.href} className="link link-primary text-lg">
                    {link.label}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
