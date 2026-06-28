import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-luxe-white dark:bg-luxe-charcoal border-t border-zinc-200 dark:border-luxe-graphite">
      <div className="container-luxe py-16">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Explore */}
          <div>
            <h4 className="font-heading font-semibold mb-5 text-luxe-black dark:text-luxe-white text-lg">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Wigs Collection', to: '/shop' },
                { name: 'All Services', to: '/services' },
                { name: 'Book Appointment', to: '/booking' },
                { name: 'Track Orders', to: '/orders' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.to} 
                    className="text-zinc-600 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 
                            transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - With Piercing */}
          <div>
            <h4 className="font-heading font-semibold mb-5 text-luxe-black dark:text-luxe-white text-lg">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Wig Making', to: '/services/category/Wig%20Making' },
                { name: 'Installation', to: '/services/category/Installation' },
                { name: 'Sew In', to: '/services/category/Sew%20In' },
                { name: 'Ponytail', to: '/services/category/Ponytail' },
                { name: 'Coloring', to: '/services/category/Coloring' },
                { name: 'Revamping', to: '/services/category/Revamping' },
                { name: 'Piercing', to: '/services/category/Piercing' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.to}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 
                            transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-5 text-luxe-black dark:text-luxe-white text-lg">
              Visit Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">Madina, Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold-500" />
                <a 
                  href="tel:+233201234567" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 transition"
                >
                  +233 20 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold-500" />
                <a 
                  href="mailto:hello@dluxewigs.com" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 transition"
                >
                  hello@dluxewigs.com
                </a>
              </li>
            </ul>
          </div>

          {/* Brand + Social - Spans full width on mobile, 1 col on md+ */}
          <div className="col-span-3 md:col-span-1">
            <h3 className="font-heading text-2xl font-bold text-gradient-gold mb-4">
              D’Luxe Wigs
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 leading-relaxed">
              Premium wigs and luxury hairstyling services in Accra. Your crown, our craft.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaInstagram, href: 'https://instagram.com/dluxewigs' },
                { icon: FaFacebookF, href: 'https://facebook.com/dluxewigs' },
                { icon: FaTwitter, href: 'https://twitter.com/dluxewigs' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-luxe-graphite 
                           flex items-center justify-center hover:bg-gold-500 
                           hover:text-luxe-black transition-all hover:shadow-glow-gold"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider-gold mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <p>© 2026 D’Luxe Wigs. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/policy" className="hover:text-gold-600 dark:hover:text-gold-400 transition">
              Policies & Terms
            </Link>
            <Link to="/privacy" className="hover:text-gold-600 dark:hover:text-gold-400 transition">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
