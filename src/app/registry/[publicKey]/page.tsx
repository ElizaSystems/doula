'use client'

import { useEffect, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { AppHero } from '@/components/ui/ui-layout'
import { WalletButton } from '@/components/solana/solana-provider'
import { IconGift, IconShare } from '@tabler/icons-react'
import toast from 'react-hot-toast'

interface RegistryItem {
  id: string
  title: string
  description: string
  price: number
  category: string
  purchased: boolean
  purchasedBy?: string
  quantity: number
  affiliateLink: string
}

export default function RegistryPage({ params }: { params: { publicKey: string } }) {
  const { publicKey: currentUser } = useWallet()
  const [items, setItems] = useState<RegistryItem[]>([])
  const [registryOwner, setRegistryOwner] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const ownerKey = new PublicKey(params.publicKey)
      setRegistryOwner(ownerKey.toString())
      // Here you would fetch the registry items for this public key
      // For now using mock data
      setItems(mockRegistryItems)
    } catch (error) {
      console.error('Invalid public key:', error)
    }
    setLoading(false)
  }, [params.publicKey])

  const handlePurchase = async (itemId: string) => {
    if (!currentUser) {
      toast.error('Please connect your wallet to purchase items')
      return
    }
    // Here you would implement the purchase logic
    toast.success('Item marked as purchased!')
    setItems(items.map(item => 
      item.id === itemId ? { ...item, purchased: true, purchasedBy: currentUser.toString() } : item
    ))
  }

  if (loading) {
    return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg"></span></div>
  }

  return (
    <div className="container mx-auto p-4">
      <AppHero 
        title={`Baby Registry for ${registryOwner.slice(0, 4)}...${registryOwner.slice(-4)}`}
        subtitle="Help welcome a new life into the world"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {items.map((item) => (
          <div key={item.id} className={`card bg-base-100 shadow-xl ${item.purchased ? 'opacity-60' : ''}`}>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p className="text-sm opacity-70">{item.description}</p>
              <div className="badge badge-outline mt-2">{item.category}</div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">${item.price}</span>
                <span className="text-sm">Qty: {item.quantity}</span>
              </div>

              {item.purchased ? (
                <div className="mt-4 text-sm text-success">
                  Purchased by {item.purchasedBy?.slice(0, 4)}...{item.purchasedBy?.slice(-4)}
                </div>
              ) : (
                <div className="card-actions justify-end mt-4">
                  <a 
                    href={item.affiliateLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    onClick={() => handlePurchase(item.id)}
                  >
                    <IconGift size={20} className="mr-2" />
                    Purchase Gift
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!items.length && (
        <div className="text-center py-12">
          <p className="text-xl">No items found in this registry</p>
        </div>
      )}
    </div>
  )
}

const mockRegistryItems: RegistryItem[] = [
  {
    id: '1',
    title: 'Convertible Crib',
    description: '4-in-1 convertible crib that grows with your baby',
    price: 299.99,
    category: 'Nursery',
    purchased: false,
    quantity: 1,
    affiliateLink: 'https://amazon.com/convertible-crib'
  },
  // Add more mock items as needed
] 