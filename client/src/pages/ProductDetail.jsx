import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, ShoppingBag, Clock, Shield, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === parseInt(id));

  // Default to first variant
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-luxe-white dark:bg-luxe-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-2xl font-heading text-luxe-black dark:text-luxe-white">
            Product not found
          </p>
          <Link to="/shop" className="btn-gold-outline inline-block">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const toggleAddon = (addon) => {
    setSelectedAddons(prev =>
      prev.includes(addon.name)
     ? prev.filter(a => a!== addon.name)
        : [...prev, addon.name]
    );
  };

  const totalPrice = selectedVariant.price + selectedAddons.reduce((sum, name) => {
    const addon = product.addons?.find(a => a.name === name);
    return sum + (addon?.price || 0);
  }, 0);

  const handleAddToCart = () => {
    if (selectedVariant.stock === 0) {
      toast.error('This variant is out of stock');
      return;
    }

    addToCart({
     ...product,
      selectedVariant,
      addons: selectedAddons,
      price: totalPrice,
      quantity: 1,
      id: `${product.id}-${selectedVariant.length}-${selectedVariant.weight || 'default'}-${selectedVariant.lace || 'default'}`
    });
    toast.success(`${product.name} added to cart`);
  };

  const inStock = selectedVariant.stock > 0;

  return (
    <div className='bg-luxe-white dark:bg-luxe-black min-h-screen'>
      <div className="container-luxe py-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400
                   hover:text-gold-600 dark:hover:text-gold-400 mb-8 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-[3/4] rounded-2xl overflow-hidden card bg-zinc-100 dark:bg-luxe-graphite"
            >
              <img
                src={product.images?.[currentImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition
                      ${currentImage === idx
                     ? 'border-gold-500 shadow-glow-gold'
                        : 'border-zinc-200 dark:border-luxe-graphite hover:border-gold-500/40'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="badge-gold mb-3 inline-block">{product.category}</span>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-3 text-luxe-black dark:text-luxe-white">
                {product.name}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                {product.desc}
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Package className="h-4 w-4 text-gold-500" />
                <span>{product.texture}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Shield className="h-4 w-4 text-gold-500" />
                <span>{product.lace}</span>
              </div>
              {product.density && (
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <Clock className="h-4 w-4 text-gold-500" />
                  <span>{product.density} Density</span>
                </div>
              )}
            </div>

            {/* Variants: Length/Weight/Lace */}
            <div>
              <h3 className="font-heading font-semibold mb-3 text-lg text-luxe-black dark:text-luxe-white">
                Select Options
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.stock === 0}
                    className={`p-4 border-2 rounded-xl text-left transition
                      ${selectedVariant === variant
                     ? 'border-gold-500 bg-gold-500/10 shadow-glow-gold'
                        : 'border-zinc-200 dark:border-luxe-graphite hover:border-gold-500/40'}
                      ${variant.stock === 0? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <p className="font-semibold text-luxe-black dark:text-luxe-white text-sm">
                      {variant.length} {variant.weight && `• ${variant.weight}`}
                    </p>
                    {variant.lace && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {variant.lace}
                      </p>
                    )}
                    <p className="font-bold text-gradient-gold mt-2">₵{variant.price}</p>
                    {variant.stock <= 3 && variant.stock > 0 && (
                      <p className="text-xs text-gold-600 dark:text-gold-400 mt-1">
                        Only {variant.stock} left
                      </p>
                    )}
                    {variant.stock === 0 && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Out of stock
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Addons */}
            {product.addons && product.addons.length > 0 && (
              <div>
                <h3 className="font-heading font-semibold mb-3 text-lg text-luxe-black dark:text-luxe-white">
                  Add-ons
                </h3>
                <div className="space-y-3">
                  {product.addons.map(addon => (
                    <label
                      key={addon.name}
                      className="flex items-center justify-between p-4 border-2 border-zinc-200 dark:border-luxe-graphite
                               rounded-xl cursor-pointer hover:border-gold-500/40 hover:bg-gold-500/5 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAddons.includes(addon.name)}
                          onChange={() => toggleAddon(addon)}
                          className="w-5 h-5 rounded border-zinc-300 dark:border-luxe-graphite
                                   text-gold-500 focus:ring-gold-500 focus:ring-2 cursor-pointer"
                        />
                        <span className="font-medium text-luxe-black dark:text-luxe-white">
                          {addon.name}
                        </span>
                      </div>
                      <span className="font-bold text-gradient-gold">+₵{addon.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="card p-6 bg-gold-500/10 border-gold-500/30 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Base Price:</span>
                <span className="font-semibold text-luxe-black dark:text-luxe-white">
                  ₵{selectedVariant.price}
                </span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Add-ons:</span>
                  <span className="font-semibold text-luxe-black dark:text-luxe-white">
                    +₵{selectedAddons.reduce((sum, name) => {
                      const addon = product.addons?.find(a => a.name === name);
                      return sum + (addon?.price || 0);
                    }, 0)}
                  </span>
                </div>
              )}
              <div className="divider-gold my-3" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-luxe-black dark:text-luxe-white">Total:</span>
                <span className="text-3xl font-heading font-bold text-gradient-gold">
                  ₵{totalPrice}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-lg
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <ShoppingBag className="h-5 w-5" />
              {!inStock? 'Out of Stock' : 'Add to Cart'}
            </button>

            {/* Specs */}
            {product.specs && (
              <div>
                <h3 className="font-heading font-semibold mb-4 text-xl text-luxe-black dark:text-luxe-white">
                  Specifications
                </h3>
                <div className="card p-6 space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm pb-3 border-b border-zinc-200/60 dark:border-luxe-graphite last:border-0 last:pb-0">
                      <span className="text-zinc-600 dark:text-zinc-400">{key}:</span>
                      <span className="font-medium text-luxe-black dark:text-luxe-white text-right max-w-[60%]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Care Instructions */}
            {product.care && product.care.length > 0 && (
              <div>
                <h3 className="font-heading font-semibold mb-4 text-xl text-luxe-black dark:text-luxe-white">
                  Care Instructions
                </h3>
                <ul className="space-y-3">
                  {product.care.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                      <div className="h-6 w-6 rounded-full bg-gold-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-gold-500" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
