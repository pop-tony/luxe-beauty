import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  const displayPrice = service.priceRange || `₵${service.price}`;
  
  return (
    <Link to={`/services/${service.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="card-glass overflow-hidden group cursor-pointer"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {service.featured && (
            <span className="badge-gold absolute top-3 left-3">
              Popular
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-luxe-black/60 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gold-600 dark:text-gold-400">
              {service.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
              <Clock className="h-4 w-4" /> {service.duration}
            </span>
          </div>

          <h3 className="text-xl font-heading font-bold mb-2 text-luxe-black dark:text-luxe-white 
                       group-hover:text-gold-600 dark:group-hover:text-gold-400 transition">
            {service.name}
          </h3>
          
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
            {service.desc}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-heading font-bold text-gradient-gold">
                {displayPrice}
              </p>
              {service.priceNote && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{service.priceNote}</p>
              )}
            </div>
            <div className="p-2 rounded-full bg-gold-500/10 group-hover:bg-gold-500 
                          group-hover:shadow-glow-gold transition-all">
              <ArrowRight className="h-5 w-5 text-gold-500 group-hover:text-luxe-black" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
