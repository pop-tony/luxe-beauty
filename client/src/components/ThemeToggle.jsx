import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative rounded-xl p-2.5 hover:bg-zinc-100 dark:hover:bg-luxe-charcoal 
               hover:text-gold-600 dark:hover:text-gold-400 transition-all duration-200"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark'? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light'? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </motion.div>
    </button>
  );
}
