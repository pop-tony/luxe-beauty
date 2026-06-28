import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Shop() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Hair Care', 'Nail Care', 'Skin Care', 'Tools', 'Wigs'];
  const filtered = filter === 'All'? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-luxe-white dark:bg-luxe-black py-20">
      <div className="container-luxe">
        <div className="text-center mb-12">
          <span className="badge-gold mb-4 inline-block">Collection</span>
          <h1 className="text-5xl font-heading text-gradient-gold mb-4">Shop Beauty</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">Professional products we trust</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full transition font-medium ${
                filter === cat
             ? 'bg-gold-500 text-luxe-black shadow-glow-gold'
                  : 'card hover:border-gold-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
}
