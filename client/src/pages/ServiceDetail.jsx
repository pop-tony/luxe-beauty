import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Check, ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { services } from '../data/services';

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find(s => s.id === parseInt(id));
  const [selectedAddons, setSelectedAddons] = useState([]);

  if (!service) return (
    <div className="min-h-screen bg-luxe-white dark:bg-luxe-black flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-heading text-luxe-black dark:text-luxe-white mb-4">
          Service not found
        </p>
        <Link to="/services" className="btn-gold-outline">Back to Services</Link>
      </div>
    </div>
  );

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => 
      prev.includes(addon.name)
        ? prev.filter(a => a!== addon.name)
        : [...prev, addon.name]
    );
  };

  const totalPrice = service.price + selectedAddons.reduce((sum, name) => {
    const addon = service.addons?.find(a => a.name === name);
    return sum + (addon?.price || 0);
  }, 0);

  return (
    <div className='bg-luxe-white dark:bg-luxe-black'>
      <div className="container-luxe py-12">
        <Link 
          to={`/services/category/${encodeURIComponent(service.category)}`}
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 
                   hover:text-gold-600 dark:hover:text-gold-400 mb-8 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to {service.category}
        </Link>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/3] rounded-2xl overflow-hidden card"
          >
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="badge-gold mb-3 inline-block">{service.category}</span>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4 text-luxe-black dark:text-luxe-white">
                {service.name}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">{service.desc}</p>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Price</p>
                <span className="text-4xl font-heading font-bold text-gradient-gold">
                  {service.priceRange || `₵${service.price}`}
                </span>
                {service.priceNote && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{service.priceNote}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Duration</p>
                <span className="flex items-center gap-2 text-lg font-semibold text-luxe-black dark:text-luxe-white">
                  <Clock className="h-5 w-5 text-gold-500" /> {service.duration}
                </span>
              </div>
            </div>

            {service.includes && service.includes.length > 0 && (
              <div>
                <h3 className="font-heading font-semibold mb-4 text-xl text-luxe-black dark:text-luxe-white">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {service.includes.map(item => (
                    <li key={item} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                      <div className="h-6 w-6 rounded-full bg-gold-500/15 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-gold-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.addons && service.addons.length > 0 && (
              <div>
                <h3 className="font-heading font-semibold mb-4 text-xl text-luxe-black dark:text-luxe-white">
                  Add-ons
                </h3>
                <div className="space-y-3">
                  {service.addons.map(addon => (
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
                                   text-gold-500 focus:ring-gold-500 cursor-pointer" 
                        />
                        <span className="font-medium text-luxe-black dark:text-luxe-white">{addon.name}</span>
                      </div>
                      <span className="font-bold text-gradient-gold">+₵{addon.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {selectedAddons.length > 0 && (
              <div className="card p-4 bg-gold-500/10 border-gold-500/30">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-luxe-black dark:text-luxe-white">Total with add-ons:</span>
                  <span className="text-2xl font-heading font-bold text-gradient-gold">₵{totalPrice}</span>
                </div>
              </div>
            )}

            <Link
              to="/booking"
              state={{ service, addons: selectedAddons, totalPrice }}
              className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-lg"
            >
              <Sparkles className="h-5 w-5" />
              Book This Service
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
