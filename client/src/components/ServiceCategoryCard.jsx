import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCategoryCard({ category }) {
  return (
    <Link to={`/services/category/${encodeURIComponent(category.name)}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="card-glass overflow-hidden group cursor-pointer"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxe-black/80 via-luxe-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-heading font-bold text-luxe-white mb-1">
              {category.name}
            </h3>
            <p className="text-gold-400 text-sm font-medium">
              {category.count} {category.count === 1 ? 'service' : 'services'}
            </p>
          </div>

          <div className="absolute top-4 right-4 p-2 rounded-full bg-gold-500/20 backdrop-blur-sm 
                        opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ArrowRight className="h-5 w-5 text-gold-400" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
