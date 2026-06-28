import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import LiveTestimonials from '../components/LiveTestimonials';
import { services } from '../data/services';
import { products } from '../data/products';

const features = [
  { icon: Sparkles, title: 'Expert Stylists', desc: 'Trained pros who know texture, tone, and trends' },
  { icon: Shield, title: 'Pro Products Only', desc: 'We use and sell what we trust on our own hair & skin' },
  { icon: Clock, title: 'Easy Booking', desc: 'Book online 24/7. No waiting, no stress' }
];

export default function Home() {
  const featuredServices = services.filter(s => s.featured);
  const bestSellers = products.filter(p => p.featured);

  return (
    <div className="bg-luxe-white dark:bg-luxe-black text-luxe-black dark:text-luxe-white">
      <section className="relative bg-luxe-black text-luxe-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-luxe-black/50 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container-luxe py-24 lg:py-40"
        >
          <span className="badge-gold mb-6 inline-block">Accra's Premier Beauty Studio</span>
          <h1 className="text-5xl lg:text-7xl font-heading font-black mb-6 max-w-2xl leading-tight">
            Unlock Your <span className="text-gradient-gold">Glow</span> at Luxe Beauty
          </h1>
          <p className="text-lg text-zinc-300 mb-10 max-w-xl leading-relaxed">
            Premium wigs, hair styling, and piercing in Accra. Shop professional products. All in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/services"
              className="btn-gold px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2"
            >
              Book Appointment <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/shop"
              className="btn-gold-outline px-8 py-4 rounded-full font-semibold text-center backdrop-blur-sm"
            >
              Shop Products
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="bg-zinc-50 dark:bg-luxe-charcoal/30 py-20">
        <div className="container-luxe">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex p-5 rounded-2xl bg-gold-500/15 mb-5 shadow-glow-gold group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="h-7 w-7 text-gold-500" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{f.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="badge-gold mb-3 inline-block">Our Services</span>
            <h2 className="text-4xl font-heading text-gradient-gold mb-2">Popular Services</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Our most booked treatments</p>
          </div>
          <Link to="/services" className="text-gold-600 dark:text-gold-400 font-semibold hover:underline hidden sm:block">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredServices.map(service => <ServiceCard key={service.id} service={service} />)}
        </div>
      </section>

      <section className="bg-zinc-50 dark:bg-luxe-charcoal/30">
        <div className="container-luxe py-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="badge-gold mb-3 inline-block">Shop</span>
              <h2 className="text-4xl font-heading text-gradient-gold mb-2">Best Sellers</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Products our clients love</p>
            </div>
            <Link to="/shop" className="text-gold-600 dark:text-gold-400 font-semibold hover:underline hidden sm:block">Shop All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <LiveTestimonials />

      <section className="bg-gradient-to-r from-gold-600 to-gold-500 text-luxe-black">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl sm:text-5xl font-heading font-black mb-4">Ready to Glow?</h2>
          <p className="text-lg text-luxe-black/80 mb-10">
            Book your appointment or shop professional products now
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-luxe-black text-luxe-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-900 transition shadow-lg"
            >
              Book Appointment
            </Link>
            <Link
              to="/shop"
              className="bg-luxe-white/20 backdrop-blur-sm px-8 py-4 rounded-full font-semibold hover:bg-luxe-white/30 transition border-2 border-luxe-black"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
