'use client';

import { IconShoppingCart, IconDiamond } from '@tabler/icons-react';

interface PrintProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceFiat: string;
  priceToken: string; // e.g., "1000 $BaiBai"
  nftAvailable: boolean;
}

const products: PrintProduct[] = [
  {
    id: 'bgg001',
    name: 'Little Lakshmi\'s Light',
    description: 'A beautiful print symbolizing prosperity, fortune, and auspicious beginnings for your newborn. Celebrate the light they bring into your life.',
    imageUrl: 'https://via.placeholder.com/400x500.png?text=Little+Lakshmi%27s+Light+Print',
    priceFiat: '$49.99',
    priceToken: '1500 $BaiBai',
    nftAvailable: true,
  },
  {
    id: 'bgg002',
    name: 'Baby Ganesha\'s Guidance',
    description: 'Invoke blessings of wisdom and remover of obstacles with this charming print. A perfect spiritual guardian for a new journey.',
    imageUrl: 'https://via.placeholder.com/400x500.png?text=Baby+Ganesha%27s+Guidance+Print',
    priceFiat: '$49.99',
    priceToken: '1500 $BaiBai',
    nftAvailable: true,
  },
  {
    id: 'bgg003',
    name: 'Serene Saraswati\'s Blessing',
    description: 'Gift the essence of knowledge, music, and art. This print is a prayer for a life filled with creativity and learning.',
    imageUrl: 'https://via.placeholder.com/400x500.png?text=Serene+Saraswati%27s+Blessing+Print',
    priceFiat: '$39.99',
    priceToken: '1200 $BaiBai',
    nftAvailable: false, // Example of one without NFT for now
  },
];

export default function BabyGodsGoddessesPage() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-primary">Baby Gods & Goddesses</h1>
        <p className="text-xl lg:text-2xl mt-3 text-neutral-content">
          Spiritual newborn-themed prints with optional NFT twins – a timeless gift for new beginnings.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-secondary">Our Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="rounded-t-lg object-cover w-full h-80"
              />
              <div className="card-body">
                <h3 className="card-title text-2xl">{product.name}</h3>
                <p className="text-neutral-content/80 text-sm mt-1 min-h-[60px]">{product.description}</p>
                
                <div className="my-3">
                  <p className="font-semibold text-lg">Price: {product.priceFiat} / {product.priceToken}</p>
                  {product.nftAvailable && (
                    <span className="badge badge-info mt-1">
                      <IconDiamond size={14} className="mr-1" /> Optional NFT Twin Available
                    </span>
                  )}
                </div>
                
                <div className="card-actions justify-end mt-auto">
                  <button className="btn btn-primary">
                    <IconShoppingCart size={20} className="mr-2" /> View Details & Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center p-8 bg-base-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-accent">A Gift of Art & Soul</h2>
        <p className="text-lg text-neutral-content mb-6 max-w-3xl mx-auto">
          Each &quot;Baby Gods &amp; Goddesses&quot; print is thoughtfully designed by Amrita Sethi, blending spiritual symbolism with modern aesthetics. These artworks serve as beautiful nursery decor and meaningful keepsakes.
        </p>
        <p className="text-lg text-neutral-content mb-4 max-w-3xl mx-auto">
          Choose to pair your physical print with a unique digital twin – an NFT that certifies authenticity and can become part of your child&apos;s digital legacy. Purchases can be made using traditional currency or with your $BaiBai tokens.
        </p>
        <p className="text-sm text-neutral-content/70 max-w-3xl mx-auto">
          (Secure checkout and NFT minting process coming soon via our Marketplace.)
        </p>
      </section>
    </div>
  );
} 