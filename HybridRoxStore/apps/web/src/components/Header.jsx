import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart.jsx';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector.jsx';
import Logo from './Logo.jsx';

const Header = ({ setIsCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const { t } = useTranslation('common');

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: t('nav.shop'), path: '/tienda' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.community'), path: '/community' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[50] bg-background border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-widest uppercase transition-colors duration-200 min-h-[44px] flex items-center ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons & Language (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <LanguageSelector />
            <button 
              className="text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" 
              aria-label={t('actions.search')}
            >
              <Search size={22} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center gap-2"
              aria-label={t('actions.cart')}
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              <span className="text-sm font-medium">({itemCount})</span>
            </button>
          </div>

          {/* Mobile Toggle & Icons */}
          <div className="flex items-center gap-2 lg:hidden z-[60]">
            <LanguageSelector />
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center gap-1"
              aria-label={t('actions.cart')}
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              {itemCount > 0 && <span className="text-xs font-medium">{itemCount}</span>}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMenuOpen ? t('actions.close') : t('actions.menu')}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 top-20 md:top-24 bg-background border-t border-border z-[40] overflow-y-auto"
          >
            <nav className="flex flex-col container-custom py-12 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-4xl md:text-5xl font-['Bebas_Neue'] tracking-wider uppercase transition-colors py-2 ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;