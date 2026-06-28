import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  // Get price range from variants
  const prices = product.variants.map(v => v.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceDisplay = minPrice === maxPrice
   ? `₵${minPrice}`
    : `₵${minPrice} - ₵${maxPrice}`;

  // Check if any variant in stock
  const inStock = product.variants.some(v => v.stock > 0);

  return (
    <Link to={`/shop/${product.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="card-glass overflow-hidden group cursor-pointer"
      >
        <div className="aspect-[3/4] relative overflow-hidden bg-zinc-100 dark:bg-luxe-graphite">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.bestseller && (
            <span className="badge-gold absolute top-3 left-3">
              Bestseller
            </span>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-luxe-black/60 flex items-center justify-center">
              <span className="bg-luxe-white text-luxe-black px-4 py-2 rounded-full font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <p className="text-xs font-medium text-gold-600 dark:text-gold-400 mb-1 uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="font-heading font-bold text-lg mb-1 text-luxe-black dark:text-luxe-white
                       line-clamp-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition">
            {product.name}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            {product.texture} • {product.lace}
          </p>
          <p className="text-2xl font-heading font-bold text-gradient-gold">
            {priceDisplay}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
