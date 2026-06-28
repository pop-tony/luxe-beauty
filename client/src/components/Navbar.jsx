import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Home, Store, Scissors, Phone, Package, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrderContext } from '../context/OrderContext';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', to: '/', icon: Home },
  { name: 'Shop', to: '/shop', icon: Store },
  { name: 'Services', to: '/services', icon: Scissors },
  { name: 'Appointments', to: '/appointments', icon: Calendar },
  { name: 'Orders', to: '/orders', icon: Package },
  { name: 'Contact', to: '/contact', icon: Phone },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const { appointments, orders } = useOrderContext();
  const location = useLocation();

  // Count active appointments for badge
  const activeAppointments = appointments.filter(
    a => ['pending', 'in_progress', 'pending_sync'].includes(a.status)
  ).length;

  const activeOrders = orders.filter(
    o => ['pending', 'paid', 'processing', 'shipped', 'out_for_delivery', 'pending_sync'].includes(o.status)
  ).length;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/60 dark:border-luxe-graphite/60 
                    bg-luxe-white/80 dark:bg-luxe-black/80 backdrop-blur-xl">
      <div className="container-luxe">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <h1 className="text-2xl lg:text-3xl font-heading font-black">
              <span className="text-gradient-gold">Luxe</span> Beauty
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              const showBadge = 
                (link.to === '/appointments' && activeAppointments > 0) ||
                (link.to === '/orders' && activeOrders > 0);

              return (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    active
                      ? 'text-gold-600 dark:text-gold-400 bg-gold-500/10'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-zinc-100 dark:hover:bg-luxe-charcoal/50'
                  }`}
                >
                  {link.name}
                  {showBadge && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-luxe-black shadow-glow-gold">
                      {link.to === '/appointments' ? activeAppointments : activeOrders}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative rounded-xl p-2.5 hover:bg-zinc-100 dark:hover:bg-luxe-charcoal 
                       hover:text-gold-600 dark:hover:text-gold-400 transition-all duration-200"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center 
                           rounded-full bg-gold-500 text-xs font-bold text-luxe-black shadow-glow-gold"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* CTA - Desktop only */}
            <Link to="/booking" className="hidden xl:block">
              <button className="btn-gold text-sm px-6">
                Book Now
              </button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden rounded-xl p-2.5 hover:bg-zinc-100 dark:hover:bg-luxe-charcoal transition"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-zinc-200/60 dark:border-luxe-graphite/60 bg-luxe-white dark:bg-luxe-black overflow-hidden"
          >
            <div className="container-luxe py-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.to);
                const showBadge = 
                  (link.to === '/appointments' && activeAppointments > 0) ||
                  (link.to === '/orders' && activeOrders > 0);

                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition ${
                      active
                        ? 'bg-gold-500/15 text-gold-600 dark:text-gold-400'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-luxe-charcoal/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{link.name}</span>
                    </div>
                    {showBadge && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-luxe-black">
                        {link.to === '/appointments' ? activeAppointments : activeOrders}
                      </span>
                    )}
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-zinc-200/60 dark:border-luxe-graphite/60">
                <Link to="/booking" onClick={() => setMobileOpen(false)}>
                  <button className="btn-gold w-full">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
