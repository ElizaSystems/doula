'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { AppHero } from '../ui/ui-layout'
import { DoulaChat } from '../doula/doula-chat'
import { WalletButton } from '../solana/solana-provider'
import { IconCalendar, IconMessage, IconBook, IconUser } from '@tabler/icons-react'
import { useCluster } from '../cluster/cluster-data-access'
import toast from 'react-hot-toast'
import { ShoppingList } from '../shopping/shopping-list'

const resources = [
  { label: 'Pregnancy Week by Week', href: '/resources/pregnancy-timeline', progress: 0 },
  { label: 'Birth Plan Templates', href: '/resources/birth-plans', progress: 0 },
  { label: 'Nutrition Guidelines', href: '/resources/nutrition', progress: 30 },
  { label: 'Common Pregnancy Symptoms', href: '/resources/symptoms', progress: 60 },
  { label: 'Labor Positions Guide', href: '/resources/labor-positions', progress: 10 },
]

const doulaServices = [
  {
    id: 1,
    title: "Pregnancy Support Package",
    description: "24/7 access to AI doula support throughout your pregnancy",
    price: 1,
    duration: "9 months",
    features: ["Unlimited chat", "Weekly check-ins", "Custom birth plan"]
  },
  {
    id: 2,
    title: "Labor & Delivery Preparation",
    description: "Comprehensive guidance for birth preparation",
    price: 0.5,
    duration: "3 months",
    features: ["Birth positions", "Breathing techniques", "Partner support guide"]
  },
  {
    id: 3,
    title: "Postpartum Care",
    description: "Support for the fourth trimester",
    price: 0.7,
    duration: "3 months",
    features: ["Recovery tips", "Newborn care", "Emotional support"]
  }
]

// Mock data for development and fallback
const mockUserData = {
  weeksPregant: 24,
  dueDate: '2024-08-15',
  chatSessions: 24,
  chatIncrease: 30,
  resourcesCompleted: 3,
  totalResources: 5,
  activePackage: 'Pregnancy Support',
  packageValidUntil: 'Dec 2024',
  recentActivity: [
    { text: 'Asked about morning sickness', completed: true },
    { text: 'Completed Nutrition Guide', completed: true },
    { text: 'Started Birth Plan', completed: false },
    { text: 'Pack Hospital Bag', completed: false },
  ]
}

export default function DashboardFeature() {
  const { publicKey } = useWallet()
  const { cluster } = useCluster()
  const [activeTab, setActiveTab] = useState('overview')
  const [dueDate, setDueDate] = useState(mockUserData.dueDate)
  const [weeksPregant, setWeeksPregnant] = useState(mockUserData.weeksPregant)
  const [connectionStatus, setConnectionStatus] = useState('development')

  useEffect(() => {
    // In development, we'll use mock data
    if (process.env.NODE_ENV === 'development') {
      setConnectionStatus('development')
      return
    }

    const checkConnection = async () => {
      try {
        const response = await fetch(cluster.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getHealth',
          }),
        })
        
        if (response.ok) {
          setConnectionStatus('connected')
        } else {
          setConnectionStatus('mock')
          toast.error(`Using offline mode due to connection issues`)
        }
      } catch (error) {
        setConnectionStatus('mock')
        console.error('Connection error:', error)
        toast.error(`Using offline mode due to connection issues`)
      }
    }

    checkConnection()
  }, [cluster])

  if (!publicKey) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">AI Digital Doula</h1>
            <p className="py-6">Connect your wallet to access personalized pregnancy and birth support</p>
            <div className="flex flex-col gap-4 items-center">
              <WalletButton className="btn btn-primary" />
              <a href="/how-it-works" className="btn btn-outline">
                Learn How To Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const ConnectionStatus = () => (
    <div className={`badge ${
      connectionStatus === 'connected' ? 'badge-success' : 
      connectionStatus === 'development' ? 'badge-warning' :
      'badge-warning'
    } gap-2`}>
      <div className={`w-2 h-2 rounded-full ${
        connectionStatus === 'connected' ? 'bg-success' : 
        connectionStatus === 'development' ? 'bg-warning' :
        'bg-warning'
      } animate-pulse`}></div>
      {connectionStatus === 'connected' ? 'Connected' : 
       connectionStatus === 'development' ? 'Development Mode' :
       'Offline Mode'}
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">AI Digital Doula</h1>
        <ConnectionStatus />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-100 rounded-box">
          <div className="stat-figure text-primary">
            <IconCalendar size={24} />
          </div>
          <div className="stat-title">Weeks Pregnant</div>
          <div className="stat-value">{weeksPregant}</div>
          <div className="stat-desc">Due Date: {dueDate || 'Not set'}</div>
        </div>
        
        <div className="stat bg-base-100 rounded-box">
          <div className="stat-figure text-secondary">
            <IconMessage size={24} />
          </div>
          <div className="stat-title">Chat Sessions</div>
          <div className="stat-value">24</div>
          <div className="stat-desc">↗︎ 8 (30%) more than last week</div>
        </div>

        <div className="stat bg-base-100 rounded-box">
          <div className="stat-figure text-accent">
            <IconBook size={24} />
          </div>
          <div className="stat-title">Resources Completed</div>
          <div className="stat-value">3/5</div>
          <div className="stat-desc">60% completion rate</div>
        </div>

        <div className="stat bg-base-100 rounded-box">
          <div className="stat-figure text-info">
            <IconUser size={24} />
          </div>
          <div className="stat-title">Active Package</div>
          <div className="stat-value text-sm">Pregnancy Support</div>
          <div className="stat-desc">Valid until Dec 2024</div>
        </div>
      </div>

      {connectionStatus === 'error' ? (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Connection Error</h3>
            <div className="text-xs">Unable to connect to the Solana network. Please try again later or switch clusters.</div>
          </div>
        </div>
      ) : (
        <>
          <div className="tabs tabs-boxed justify-center mb-6">
            <a 
              className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </a>
            <a 
              className={`tab ${activeTab === 'chat' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              Chat with Doula
            </a>
            <a 
              className={`tab ${activeTab === 'services' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              Services
            </a>
            <a 
              className={`tab ${activeTab === 'resources' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </a>
            <a 
              className={`tab ${activeTab === 'shopping' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('shopping')}
            >
              Shopping List
            </a>
          </div>

          <div className="mt-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Pregnancy Timeline</h2>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Due Date</span>
                      </label>
                      <input 
                        type="date" 
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="input input-bordered w-full" 
                      />
                    </div>
                    <div className="mt-4">
                      <div className="radial-progress text-primary" style={{"--value": (weeksPregant/40)*100} as any}>
                        {weeksPregant}/40 weeks
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Recent Activity</h2>
                    <ul className="steps steps-vertical">
                      {mockUserData.recentActivity.map((activity, index) => (
                        <li key={index} className={`step ${activity.completed ? 'step-primary' : ''}`}>{activity.text}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="max-w-4xl mx-auto">
                <DoulaChat />
              </div>
            )}

            {activeTab === 'services' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {doulaServices.map((service) => (
                  <div key={service.id} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">{service.title}</h2>
                      <p>{service.description}</p>
                      <ul className="menu bg-base-200 rounded-box my-4">
                        {service.features.map((feature, index) => (
                          <li key={index}><a>{feature}</a></li>
                        ))}
                      </ul>
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
            )}

            {activeTab === 'resources' && (
              <div className="max-w-4xl mx-auto space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="card bg-base-100 shadow-hover">
                    <div className="card-body">
                      <div className="flex justify-between items-center">
                        <a href={resource.href} className="link link-primary text-lg">
                          {resource.label}
                        </a>
                        <progress 
                          className="progress progress-primary w-56" 
                          value={resource.progress} 
                          max="100"
                        ></progress>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shopping' && (
              <div className="max-w-4xl mx-auto">
                <ShoppingList isAdmin={true} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
