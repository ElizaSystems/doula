'use client'

import { useState } from 'react'
import { IconEdit, IconTrash, IconPlus, IconShare, IconCopy } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import { useWallet } from '@solana/wallet-adapter-react'

interface RegistryItem {
  id: string
  title: string
  description: string
  price: number
  category: 'Essentials' | 'Nursery' | 'Feeding' | 'Safety' | 'Clothing'
  purchased: boolean
  purchasedBy?: string
  quantity: number
  affiliateLink?: string
}

const defaultRegistryItems: RegistryItem[] = [
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
  {
    id: '2',
    title: 'Baby Monitor',
    description: 'Digital video baby monitor with night vision',
    price: 159.99,
    category: 'Safety',
    purchased: false,
    quantity: 1,
    affiliateLink: 'https://amazon.com/baby-monitor'
  },
  {
    id: '3',
    title: 'Diaper Bag',
    description: 'Stylish and functional diaper bag with changing pad',
    price: 89.99,
    category: 'Essentials',
    purchased: false,
    quantity: 1,
    affiliateLink: 'https://amazon.com/diaper-bag'
  }
]

export function BabyRegistry() {
  const { publicKey } = useWallet()
  const [items, setItems] = useState<RegistryItem[]>(defaultRegistryItems)
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'Essentials' as const,
    quantity: 1
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  const registryLink = `${window.location.origin}/registry/${publicKey?.toString()}`

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My Baby Registry',
        text: 'Check out my baby registry!',
        url: registryLink
      })
    } catch (err) {
      await navigator.clipboard.writeText(registryLink)
      toast.success('Registry link copied to clipboard!')
    }
  }

  const addItem = () => {
    if (!newItem.title) return
    setItems([...items, {
      ...newItem,
      id: Date.now().toString(),
      affiliateLink: '',
      recommended: false,
      purchased: false,
      quantity: newItem.quantity || 1
    }])
    setNewItem({
      title: '',
      description: '',
      price: 0,
      category: 'Essentials',
      quantity: 1
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Baby Registry</h2>
        <button onClick={handleShare} className="btn btn-primary">
          <IconShare size={20} className="mr-2" />
          Share Registry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className={`card bg-base-100 shadow-xl ${item.purchased ? 'opacity-60' : ''}`}>
            <div className="card-body">
              <h3 className="card-title flex justify-between">
                {item.title}
                {item.purchased && <span className="badge badge-success">Purchased</span>}
              </h3>
              <p>{item.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xl">${item.price}</span>
                <span className="badge badge-neutral">Qty: {item.quantity}</span>
              </div>
              <div className="card-actions justify-end mt-4">
                <button 
                  className="btn btn-sm btn-circle"
                  onClick={() => setEditingId(item.id)}
                >
                  <IconEdit size={16} />
                </button>
                <button 
                  className="btn btn-sm btn-circle btn-error"
                  onClick={() => setItems(items.filter(i => i.id !== item.id))}
                >
                  <IconTrash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Add New Item</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={newItem.title}
              onChange={(e) => setNewItem({...newItem, title: e.target.value})}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={newItem.description}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={newItem.price}
              onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={newItem.quantity}
              min="1"
              onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})}
            />
          </div>
          <button className="btn btn-primary mt-4" onClick={addItem}>
            <IconPlus size={20} className="mr-2" />
            Add Item
          </button>
        </div>
      </div>
    </div>
  )
} 