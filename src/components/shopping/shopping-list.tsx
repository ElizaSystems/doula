'use client'

import { useState } from 'react'
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react'

interface ShoppingItem {
  id: string
  title: string
  description: string
  price: number
  affiliateLink: string
  category: 'Essentials' | 'Nursery' | 'Feeding' | 'Safety' | 'Clothing'
  recommended: boolean
}

const defaultItems: ShoppingItem[] = [
  {
    id: '1',
    title: 'Pregnancy Pillow',
    description: 'Full body pregnancy support pillow for better sleep',
    price: 39.99,
    affiliateLink: 'https://amazon.com/pregnancy-pillow',
    category: 'Essentials',
    recommended: true,
  },
  {
    id: '2',
    title: 'Prenatal Vitamins',
    description: 'Complete prenatal vitamin supplement with folic acid',
    price: 25.99,
    affiliateLink: 'https://amazon.com/prenatal-vitamins',
    category: 'Essentials',
    recommended: true,
  },
  {
    id: '3',
    title: 'Maternity Support Belt',
    description: 'Adjustable belt for back and belly support',
    price: 29.99,
    affiliateLink: 'https://amazon.com/maternity-belt',
    category: 'Essentials',
    recommended: true,
  },
  {
    id: '4',
    title: 'Pregnancy Journal',
    description: 'Document your pregnancy journey week by week',
    price: 19.99,
    affiliateLink: 'https://amazon.com/pregnancy-journal',
    category: 'Essentials',
    recommended: false,
  },
  {
    id: '5',
    title: 'Morning Sickness Relief Bands',
    description: 'Acupressure bands for nausea relief',
    price: 15.99,
    affiliateLink: 'https://amazon.com/relief-bands',
    category: 'Essentials',
    recommended: false,
  },
  {
    id: '6',
    title: 'Pregnancy Ball Chair',
    description: 'Exercise ball for pregnancy comfort and labor prep',
    price: 34.99,
    affiliateLink: 'https://amazon.com/pregnancy-ball',
    category: 'Safety',
    recommended: true,
  },
  {
    id: '7',
    title: 'Maternity Body Pillow',
    description: 'U-shaped full body support pillow',
    price: 49.99,
    affiliateLink: 'https://amazon.com/body-pillow',
    category: 'Essentials',
    recommended: true,
  },
  {
    id: '8',
    title: 'Pregnancy Tea Set',
    description: 'Organic herbal teas safe for pregnancy',
    price: 22.99,
    affiliateLink: 'https://amazon.com/pregnancy-tea',
    category: 'Essentials',
    recommended: false,
  }
]

export function ShoppingList({ isAdmin = false }) {
  const [items, setItems] = useState<ShoppingItem[]>(defaultItems)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState<Partial<ShoppingItem>>({
    category: 'Essentials',
    recommended: true,
  })

  const handleAddItem = () => {
    if (newItem.title && newItem.affiliateLink) {
      setItems([
        ...items,
        {
          ...newItem as ShoppingItem,
          id: Date.now().toString(),
        },
      ])
      setNewItem({
        category: 'Essentials',
        recommended: true,
      })
      setShowAddForm(false)
    }
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto">
      {isAdmin && (
        <div className="mb-6">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <IconPlus size={20} />
            Add Item
          </button>
          
          {showAddForm && (
            <div className="card bg-base-100 shadow-xl mt-4">
              <div className="card-body">
                <h3 className="card-title">Add New Item</h3>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={newItem.title || ''}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    value={newItem.description || ''}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={newItem.price || ''}
                    onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Affiliate Link</span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered"
                    value={newItem.affiliateLink || ''}
                    onChange={(e) => setNewItem({ ...newItem, affiliateLink: e.target.value })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as ShoppingItem['category'] })}
                  >
                    <option>Essentials</option>
                    <option>Nursery</option>
                    <option>Feeding</option>
                    <option>Safety</option>
                    <option>Clothing</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Recommended</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={newItem.recommended}
                      onChange={(e) => setNewItem({ ...newItem, recommended: e.target.checked })}
                    />
                  </label>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={handleAddItem}>Save Item</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <div className="flex flex-col h-full">
                <div>
                  <h2 className="card-title flex justify-between items-start">
                    {item.title}
                    {item.recommended && (
                      <div className="badge badge-secondary">Recommended</div>
                    )}
                  </h2>
                  <p className="text-sm opacity-70 mt-2">{item.description}</p>
                  <div className="badge badge-outline mt-3">{item.category}</div>
                </div>
                
                <div className="mt-auto pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${item.price}</span>
                    <div className="flex gap-2">
                      {isAdmin && (
                        <button 
                          className="btn btn-square btn-sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <IconTrash size={16} />
                        </button>
                      )}
                      <a 
                        href={item.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 